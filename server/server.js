const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const upload = require("./middlewares/upload");
require("dotenv").config();

const app = express();

// 1. Configure uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 2. CORS
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 3. Serve static uploaded images
app.use(
  "/uploads",
  express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");

      if (filePath.endsWith(".png")) res.type("png");
      if (filePath.endsWith(".PNG")) res.type("png");
      if (filePath.endsWith(".jpg")) res.type("jpeg");
      if (filePath.endsWith(".jpeg")) res.type("jpeg");
      if (filePath.endsWith(".gif")) res.type("gif");
    },
  })
);

// 4. Image proxy
app.get("/api/image-proxy", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl || !imageUrl.includes("/uploads/")) {
    return res.status(403).json({ error: "Unauthorized image source" });
  }

  const imagePath = path.join(uploadsDir, path.basename(imageUrl));
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.sendFile(imagePath);
});

// 5. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 7. Mongoose schema
const certificateSchema = new mongoose.Schema(
  {
    authority: { type: String, required: true },
    municipality: { type: String, required: true },
    name: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    nationality: { type: String, required: true },
    certificateNumber: { type: String, required: true, unique: true },
    profession: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    programType: { type: String, required: true },
    programEndDate: { type: Date, required: true },
    licenseNumber: { type: String, required: true },
    establishmentName: { type: String, required: true },
    establishmentNumber: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

// 8. API endpoints
app.post("/api/certificates", upload.single("image"), async (req, res) => {
  try {
    const requiredFields = [
      "authority",
      "municipality",
      "name",
      "idNumber",
      "gender",
      "nationality",
      "certificateNumber",
      "profession",
      "issueDate",
      "expiryDate",
      "programType",
      "programEndDate",
      "licenseNumber",
      "establishmentName",
      "establishmentNumber",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const certificate = new Certificate({
      ...req.body,
      issueDate: new Date(req.body.issueDate),
      expiryDate: new Date(req.body.expiryDate),
      programEndDate: new Date(req.body.programEndDate),
      image: `/uploads/${req.file.filename}`,
    });

    await certificate.save();
    const data = certificate.toObject();
    data.imageUrl = `${req.protocol}://${req.get("host")}${data.image}`;

    res.status(201).json({
      success: true,
      data,
      message: "Certificate created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        messages,
      });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 }).lean();
    const withUrls = certificates.map((cert) => ({
      ...cert,
      imageUrl: `${req.protocol}://${req.get("host")}${cert.image}`,
    }));
    res.status(200).json(withUrls);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
});

app.get("/api/certificates/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const cert = await Certificate.findById(id).lean();
    if (!cert) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    cert.imageUrl = `${req.protocol}://${req.get("host")}${cert.image}`;
    res.status(200).json({ success: true, data: cert });
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ success: false, message: "Internal error" });
  }
});

// 9. Debug
app.get("/debug-images", (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    const fileData = files.map((file) => ({
      name: file,
      path: `/uploads/${file}`,
      url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
    }));
    res.json({ uploadsDir, files: fileData });
  });
});

// 10. Serve React frontend (✨ this is the key!)
const clientBuildPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// 11. Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

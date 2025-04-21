const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const upload = require("./middlewares/upload");
require("dotenv").config();

// Validate environment variables early
const requiredEnvVars = ["MONGO_URI", "ALLOWED_ORIGINS"];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}

const app = express();

// 1. Configure uploads directory securely
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true, mode: 0o755 }); // Secure directory permissions
}

// 2. Enhanced CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400 // 24-hour preflight cache
  })
);

// 3. Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 4. Database connection with retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection failed, retrying in 5 seconds...", err);
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

// 5. Mongoose schema with validation enhancements
const certificateSchema = new mongoose.Schema(
  {
    authority: { type: String, required: [true, "Authority is required"] },
    municipality: { type: String, required: [true, "Municipality is required"] },
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    idNumber: { 
      type: String, 
      required: [true, "ID number is required"],
      unique: true,
      index: true
    },
    gender: { 
      type: String, 
      enum: { 
        values: ["male", "female"], 
        message: "Gender must be either 'male' or 'female'" 
      },
      required: true
    },
    nationality: { type: String, required: [true, "Nationality is required"] },
    certificateNumber: { 
      type: String, 
      required: [true, "Certificate number is required"],
      unique: true
    },
    profession: { type: String, required: [true, "Profession is required"] },
    issueDate: { 
      type: Date, 
      required: [true, "Issue date is required"],
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: "Invalid issue date"
      }
    },
    expiryDate: { 
      type: Date, 
      required: [true, "Expiry date is required"],
      validate: [
        {
          validator: function(v) {
            return v instanceof Date && !isNaN(v);
          },
          message: "Invalid expiry date"
        },
        {
          validator: function(v) {
            return v > this.issueDate;
          },
          message: "Expiry date must be after issue date"
        }
      ]
    },
    programType: { type: String, required: [true, "Program type is required"] },
    programEndDate: { 
      type: Date, 
      required: [true, "Program end date is required"],
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: "Invalid program end date"
      }
    },
    licenseNumber: { type: String, required: [true, "License number is required"] },
    establishmentName: { type: String, required: [true, "Establishment name is required"] },
    establishmentNumber: { type: String, required: [true, "Establishment number is required"] },
    image: { 
      type: String, 
      required: [true, "Image is required"],
      validate: {
        validator: function(v) {
          return /^\/uploads\/[a-zA-Z0-9\-_]+\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: "Invalid image path format"
      }
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for full image URL
certificateSchema.virtual("imageUrl").get(function() {
  return `${process.env.BASE_URL || ""}${this.image}`;
});

const Certificate = mongoose.model("Certificate", certificateSchema);

// 6. Secure Image Proxy
app.get("/api/image-proxy", async (req, res) => {
  try {
    const imageUrl = req.query.url;
    
    // Validate input
    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "Image URL is required" });
    }
    
    // Security: Only allow files from uploads directory
    if (!imageUrl.startsWith("/uploads/")) {
      return res.status(403).json({ error: "Unauthorized image source" });
    }
    
    // Prevent directory traversal
    const sanitizedPath = path.normalize(imageUrl).replace(/^(\.\.(\/|\\|$))+/g, "");
    const imagePath = path.join(uploadsDir, path.basename(sanitizedPath));
    
    // Verify file exists and is within uploads directory
    if (!fs.existsSync(imagePath) || 
        !imagePath.startsWith(path.resolve(uploadsDir))) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    // Set proper caching headers
    res.setHeader("Cache-Control", "public, max-age=86400"); // 24 hours
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Image proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 7. API Endpoints with improved validation
app.post("/api/certificates", upload.single("image"), async (req, res) => {
  try {
    // Validate required fields
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const certificateData = {
      ...req.body,
      image: `/uploads/${req.file.filename}`,
      issueDate: new Date(req.body.issueDate),
      expiryDate: new Date(req.body.expiryDate),
      programEndDate: new Date(req.body.programEndDate)
    };

    // Validate dates
    if (isNaN(certificateData.issueDate)) throw new Error("Invalid issue date");
    if (isNaN(certificateData.expiryDate)) throw new Error("Invalid expiry date");
    if (isNaN(certificateData.programEndDate)) throw new Error("Invalid program end date");

    const certificate = new Certificate(certificateData);
    await certificate.save();

    res.status(201).json({
      success: true,
      data: certificate.toObject(),
      message: "Certificate created successfully"
    });
  } catch (error) {
    console.error("Certificate creation error:", error);
    
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        messages
      });
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

app.get("/api/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
      
    res.status(200).json({
      success: true,
      data: certificates
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certificates"
    });
  }
});

app.get("/api/certificates/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID"
      });
    }

    const certificate = await Certificate.findById(req.params.id).lean().exec();
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// 8. Serve static uploaded files (without duplicate CORS headers)
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    // Set proper content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif"
    };
    
    if (contentTypes[ext]) {
      res.type(contentTypes[ext]);
    }
    
    // Cache for 24 hours
    res.setHeader("Cache-Control", "public, max-age=86400");
  }
}));


// 10. Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// 11. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const upload = require('./middlewares/upload');
require('dotenv').config();

const app = express();

// 1. Configure uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 2. Enhanced CORS configuration - must come before static files
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Serve static files with proper CORS headers
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    // Set CORS headers for images
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    // Fix MIME type issues
    if (filePath.endsWith('.png')) res.type('png');
    if (filePath.endsWith('.PNG')) res.type('png');
    if (filePath.endsWith('.jpg')) res.type('jpeg');
    if (filePath.endsWith('.jpeg')) res.type('jpeg');
    if (filePath.endsWith('.gif')) res.type('gif');
  }
}));

// 4. Add image proxy endpoint for frontend PDF generation
app.get('/api/image-proxy', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // For security, validate the URL points to our own uploads
    if (!imageUrl.includes('/uploads/')) {
      return res.status(403).json({ error: 'Unauthorized image source' });
    }

    const imagePath = path.join(uploadsDir, path.basename(imageUrl));
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Stream the image file
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// 5. Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 7. Certificate Schema
const certificateSchema = new mongoose.Schema({
  authority: { type: String, required: true },
  municipality: { type: String, required: true },
  name: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
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
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);

// 8. API Endpoints

// Create certificate
app.post('/api/certificates', upload.single('image'), async (req, res) => {
  try {
    const requiredFields = [
      'authority', 'municipality', 'name', 'idNumber', 'gender',
      'nationality', 'certificateNumber', 'profession', 'issueDate',
      'expiryDate', 'programType', 'programEndDate', 'licenseNumber',
      'establishmentName', 'establishmentNumber'
    ];

    // Validate required fields
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Create certificate with proper image URL
    const certificate = new Certificate({
      ...req.body,
      issueDate: new Date(req.body.issueDate),
      expiryDate: new Date(req.body.expiryDate),
      programEndDate: new Date(req.body.programEndDate),
      image: `/uploads/${req.file.filename}`
    });

    await certificate.save();
    
    // Return full URL for the image
    const certificateData = certificate.toObject();
    certificateData.imageUrl = `${req.protocol}://${req.get('host')}${certificateData.image}`;

    res.status(201).json({
      success: true,
      data: certificateData,
      message: 'Certificate created successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        messages: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // Add full image URLs
    const certificatesWithUrls = certificates.map(cert => ({
      ...cert,
      imageUrl: `${req.protocol}://${req.get('host')}${cert.image}`
    }));

    res.status(200).json(certificatesWithUrls);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch certificates'
    });
  }
});

// Get single certificate
app.get('/api/certificates/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid certificate ID format'
      });
    }

    const certificate = await Certificate.findById(req.params.id)
      .select('-__v')
      .lean();

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Add full image URL
    certificate.imageUrl = `${req.protocol}://${req.get('host')}${certificate.image}`;

    res.status(200).json({
      success: true,
      data: certificate
    });

  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// 9. Debug endpoints
app.get('/debug-images', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({
        success: false,
        message: 'Error reading uploads directory'
      });
    }

    const fileInfo = files.map(file => {
      const filePath = path.join(uploadsDir, file);
      return {
        name: file,
        path: `/uploads/${file}`,
        url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
        exists: fs.existsSync(filePath),
        size: fs.statSync(filePath).size,
        lastModified: fs.statSync(filePath).mtime
      };
    });

    res.json({
      uploadsDirectory: uploadsDir,
      files: fileInfo
    });
  });
});

// 10. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
  console.log(`CORS allowed origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:5173'}`);
  console.log(`Debug endpoints:`);
  console.log(`- http://localhost:${PORT}/debug-images`);
  console.log(`- http://localhost:${PORT}/api/image-proxy?url=/uploads/filename.ext`);
});
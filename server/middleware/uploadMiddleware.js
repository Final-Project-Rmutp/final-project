const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    const pin = req.body.pin;
    const timestamp = Date.now();
    const filename = pin + '-' + timestamp + file.originalname;
    cb(null, filename); // Set a unique filename (you can modify this as needed)
  }
});

// Validate image file type
const fileFilter = function(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file if it's an image
  } else {
    cb(new Error('Only image files are allowed')); // Reject the file if it's not an image
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

// Define the error handling middleware
function handleFileUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Multer error occurred (e.g., invalid file type)
    return res.status(400).json({ message: err.message });
  } else if (err instanceof Error) {
    // Other Error type
    console.error('Unexpected error:', err);
    return res.status(400).json({ message: err.message });
  } else {
    // Fallback for unhandled cases
    console.error('Unknown error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Middleware function for file uploads
const uploadFileMiddleware = upload.single('user_img_path');

module.exports = { uploadFileMiddleware, handleFileUploadError };

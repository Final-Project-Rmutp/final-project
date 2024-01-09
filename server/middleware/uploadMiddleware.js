const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const sharp = require('sharp');
const fileType = require('file-type');

// AWS S3 configuration
const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Multer setup for file upload
const upload = multer();

// Middleware function for S3 upload
const uploadToS3 = upload.single('image');

// Handle S3 upload
const handleS3Upload = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const buffer = file.buffer; // Assuming multer stores the file buffer in req.file.buffer
  const fileTypeResult = fileType(buffer);

  // Check if the uploaded file is an image
  if (!fileTypeResult || !fileTypeResult.mime.startsWith('image')) {
    return res.status(400).json({ error: 'Uploaded file is not an image' });
  }

  try {
    const pin = req.body.pin;
    const fileName = pin + '.webp';

    // Check if the file already exists in S3
    const headParams = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName
    };

    try {
      // Check if the file exists
      await s3Client.send(new HeadObjectCommand(headParams));

      // If it exists, add a timestamp to the file name
      const timestamp = new Date().getTime();
      fileName = pin + `_${timestamp}.webp`;
    } catch (error) {
      // File doesn't exist, proceed with the original file name
    }

    // Convert image to WebP format using sharp
    const webpBuffer = await sharp(buffer).toFormat('webp').toBuffer();

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp'
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(uploadCommand);

    req.uploadedFileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
    next();
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Handle S3 update
const handleS3Update = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const buffer = file.buffer; // Assuming multer stores the file buffer in req.file.buffer
  const fileTypeResult = fileType(buffer);

  // Check if the uploaded file is an image
  if (!fileTypeResult || !fileTypeResult.mime.startsWith('image')) {
    return res.status(400).json({ error: 'Uploaded file is not an image' });
  }

  try {
    const pin = req.body.pin;
    const fileName = pin + '.webp';

    // Check if the file already exists in S3
    const headParams = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName
    };

    try {
      // Check if the file exists
      await s3Client.send(new HeadObjectCommand(headParams));

      // If it exists, add a timestamp to the file name
      const timestamp = new Date().getTime();
      fileName = pin + `_${timestamp}.webp`;
    } catch (error) {
      // File doesn't exist, proceed with the original file name
    }

    // Convert image to WebP format using sharp
    const webpBuffer = await sharp(buffer).toFormat('webp').toBuffer();

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp'
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(uploadCommand);

    req.uploadedFileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
    next();
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Function to delete an object from S3
async function deleteObjectFromS3(objectKey) {
  try {
    const s3Client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const deleteParams = {
      Bucket: process.env.S3_BUCKET,
      Key: objectKey
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3Client.send(deleteCommand);
    console.log(`Object ${objectKey} deleted successfully from S3`);
  } catch (error) {
    console.error('Error deleting object from S3:', error);
    throw error;
  }
}

module.exports = { uploadToS3, handleS3Upload, deleteObjectFromS3 };


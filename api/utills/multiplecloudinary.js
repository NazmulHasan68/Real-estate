import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


  // Cloudinary storage setup for Multer
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'realestate/listing', // Folder in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });
  
  // Multer setup for handling file uploads
  const upload = multer({ storage });
  export const uploadMiddleware = upload.array('images', 10);
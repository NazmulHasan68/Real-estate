import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

// Configure Cloudinary with `.v2` to access the API
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name from Cloudinary dashboard
    api_key: process.env.CLOUDINARY_API_KEY,       // API key from Cloudinary dashboard
    api_secret: process.env.CLOUDINARY_API_SECRET  // API secret from Cloudinary dashboard
});

// Export the configured cloudinary instance for use in other parts of the app
export default cloudinary;


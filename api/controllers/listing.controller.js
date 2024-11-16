import Listing from '../models/listing.model.js';
import { errorHandler } from '../utills/error.js';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const deletelistingController = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only delete your own listing'));
    }

    const imageDeletionResults = await Promise.all(
      listing.imageUrls.map((image) => {
        const publicId = new URL(image).pathname
          .split('/image/upload/')[1] // Extract "v123456789/folder_name/image_name"
          .split('/') // Split into parts
          .slice(1) // Remove the version part (first part)
          .join('/') // Recombine the rest into "folder_name/image_name"
          .split('.')[0]; // Remove the file extension

        return cloudinary.uploader.destroy(publicId);
      })
    );

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Listing images deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    next(error);
  }
};






export const createlistingController = async (req, res, next) => {
  try {
      const listing = await Listing.create(req.body)
      return res.status(201).json(listing)
    } catch (error) {
      next(error); 
    }
};

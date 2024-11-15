import Listing from "../models/listing.model.js";
import ListingImage from "../models/listingImages.js";



// Controller for creating a listing
export const createlistingController = async (req, res, next) => {
    try {
        // Extract Cloudinary URLs from uploaded files
        const imageUrls = req.files.map((file) => file.path);
        console.log(imageUrls);
        
        const listingData = {
          images: imageUrls, // Include the uploaded image URLs
        };
    
        // Create the listing and save to the database
        const listing = await ListingImage.create({
            listingData,
        });
    
        await listing.save()

        res.status(201).json({
          message: 'Listing created and images uploaded successfully',
          listing,
        });
      } catch (error) {
        next(error); 
      }
};

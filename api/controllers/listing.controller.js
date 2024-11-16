import Listing from '../models/listing.model.js';
import { errorHandler } from '../utills/error.js';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




export const createlistingController = async (req, res, next) => {
  try {
      const listing = await Listing.create(req.body)
      return res.status(201).json(listing)
    } catch (error) {
      next(error); 
    }
};




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


export const editListingController = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found'));

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only edit your own listing'));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,  
      req.body,        
      { new: true }    
    );

    res.status(200).json({
      message: 'Listing successfully updated',
      updatedListing
    });

  } catch (error) {
    next(error);  
  }
};



export const getlistingController = async(req, res, next) =>{
  try {
    const listing = await Listing.findById(req.params.id)

    if(!listing) return next(errorHandler(404, "Listing not found!"))
    
    res.status(200).json(listing)
  } catch (error) {
    next()
  }
}



// export const getsearchController = async(req, res, next) =>{
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let offer =req.query.offer
//     if(offer === 'undefined' || offer === 'false'){
//       offer = {$in : [false, true]}
//     }

//     const furnished = req.query.furnished;
//     if(furnished === undefined || furnished === 'false'){
//       furnished = {$in : [false, true]}
//     }

//     let parking = req.query.parking
//     if(parking === undefined || parking === 'false'){
//       parking = {$in : [false , true]}
//     }

//     let type = req.query.type 
//     if(type === undefined || type === 'false'){
//       type = {$in : ['sale', 'rent']}
//     }

    // const searchTerm = req.query.searchTerm || ''
    // const sort = req.query.sort || 'createdAt'
    // const order = req.query.order || 'desc'

//     const listings = await Listing.find({
//       name : { $regex: searchTerm, $options: 'i'},
//       offer,
//       furnished,
//       parking,
//       type
//     }).sort({
//       [sort] : order
//     }).limit(limit).skip(startIndex)

//     return res.status(200).json(listings)

//   } catch (error) {
//     next(error)
//   }
// }




// export const getsearchController = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9; 
//     const startIndex = parseInt(req.query.startIndex) || 0; 

//     let offer = req.query.offer === 'true' ? true : req.query.offer === 'false' ? false : { $in: [false, true] };
//     let furnished = req.query.furnished === 'true' ? true : req.query.furnished === 'false' ? false : { $in: [false, true] };
//     let parking = req.query.parking === 'true' ? true : req.query.parking === 'false' ? false : { $in: [false, true] };
//     let type = req.query.type === 'sale' || req.query.type === 'rent' ? req.query.type : { $in: ['sale', 'rent'] };

//     const searchTerm = req.query.searchTerm || ''; 
//     const sort = req.query.sort || 'createdAt'; 
//     const order = req.query.order === 'asc' ? 1 : -1; 

//     const allowedSortFields = ['createdAt', 'regulaterPrice'];

//     if (!allowedSortFields.includes(sort)) {
//       return res.status(400).json({ message: 'Invalid sort field' });
//     }

//     const listings = await Listing.find({
//       name: { $regex: searchTerm, $options: 'i' },
//       offer,
//       furnished,
//       parking,
//       type,
//     })
//       .sort({ [sort]: order }) 
//       .limit(limit) 
//       .skip(startIndex); 

//     return res.status(200).json(listings); 
//   } catch (error) {
//     console.error('Error fetching listings:', error.message);
//     next(error); 
//   }
// };


export const getsearchController = async (req, res, next) => {
  try {
    // Default values for pagination and filters
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Helper function to handle boolean query params
    const getBooleanQueryParam = (param) => {
      if (param === 'true') return true;
      if (param === 'false') return false;
      return { $in: [false, true] };
    };

    // Get query parameters with default values
    const offer = getBooleanQueryParam(req.query.offer);
    const furnished = getBooleanQueryParam(req.query.furnished);
    const parking = getBooleanQueryParam(req.query.parking);
    const type = req.query.type === 'sale' || req.query.type === 'rent' ? req.query.type : { $in: ['sale', 'rent'] };
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Allowed sort fields
    const allowedSortFields = ['createdAt', 'regulaterPrice'];

    // Validate the sort field
    if (!allowedSortFields.includes(sort)) {
      return res.status(400).json({ message: 'Invalid sort field' });
    }

    // Create the query object
    const query = {
      name: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search
      offer,
      furnished,
      parking,
      type,
    };

    // Fetch listings from the database
    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Return the listings
    return res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error.message);
    next(error); // Forward the error to the next middleware
  }
};


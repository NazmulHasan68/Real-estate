import Listiing from '../models/listing.model.js'

export const createlistingController = async (req, res, next) => {
    try {
        const listing = await Listiing.create(req.body)
        return res.status(201).json(listing)
      } catch (error) {
        next(error); 
      }
};

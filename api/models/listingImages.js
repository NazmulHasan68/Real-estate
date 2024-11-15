import mongoose, { Schema } from "mongoose";

const imagesSchema = new Schema({
    imageUrls : {
        type : Array,
        required : true
    },
},{timestamps:true})

const ListingImage = mongoose.model('Imagelisting', imagesSchema)

export default ListingImage
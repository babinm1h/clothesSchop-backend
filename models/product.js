import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    descr: { type: String, required: true },
    categories: { type: Array, },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },

}, { timestamps: true })

export const Product = mongoose.model('Product', ProductSchema)
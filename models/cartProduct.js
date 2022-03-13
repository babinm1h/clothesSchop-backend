import mongoose from "mongoose";


const CartProductSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    quan: { type: Number, default: 1, required: true },
    productId: { type: String, required: true },
    selectedColor: { type: String, required: true }

}, { timestamps: true })

export const CartProduct = mongoose.model('CartProduct', CartProductSchema)
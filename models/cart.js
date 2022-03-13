import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: "CartProduct" }]


}, { timestamps: true })

export const Cart = mongoose.model('Cart', CartSchema)
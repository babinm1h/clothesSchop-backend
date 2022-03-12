import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        quan: { type: Number, default: 1 }
    }],


}, { timestamps: true })

export const Cart = mongoose.model('Cart', CartSchema)
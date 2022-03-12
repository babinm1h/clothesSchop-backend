import { Cart } from "../models/cart.js"

class CartController {

    async create(req, res) {
        try {
            const productId = req.params.id
            if (!productId) return res.status(400).send()
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const cart = await Cart.findOne({ userId })
            cart.products.push({ productId })
            await cart.save()
            return res.json(cart)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async get(req, res) {
        try {
            const id = req.user.id
            if (!id) return res.status(400).send()
            const cart = await Cart.findOne({ userId: id }).populate("products.productId")
            return res.json(cart)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }



}

export default new CartController()
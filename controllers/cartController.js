import { Cart } from "../models/cart.js"
import { CartProduct } from "../models/cartProduct.js"

class CartController {

    async create(req, res) {
        try {
            const productId = req.params.id
            if (!productId) return res.status(400).send()
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const { selectedColor, quan } = req.body

            const cart = await Cart.findOne({ userId })
            const cartProduct = await CartProduct.create({
                userId, product: productId, productId, selectedColor, quan
            })
            cart.products.push(cartProduct)
            await cart.save()
            return res.json(cartProduct)

            
        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async get(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()
            const cart = await CartProduct.find({ userId }).populate("product")
            return res.json(cart)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const id = req.params.id
            if (!id) return res.status(400).send()

            const product = await CartProduct.findOneAndDelete({ userId, _id: id }).populate("product")
            if (!product) return res.status(404).send()

            return res.json(product)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async addOne(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const id = req.params.id
            if (!id) return res.status(400).send()

            const product = await CartProduct.findOne({ userId, _id: id }).populate("product")
            product.quan += 1
            await product.save()
            return res.json(product)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async removeOne(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const id = req.params.id
            if (!id) return res.status(400).send()

            const product = await CartProduct.findOne({ userId, _id: id }).populate("product")
            product.quan -= 1
            await product.save()
            return res.json(product)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }



}

export default new CartController()
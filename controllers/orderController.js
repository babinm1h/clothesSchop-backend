import { Order } from "../models/order.js"

class OrderController {

    async create(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()
            const { products, amount, address } = req.body

            const order = await Order.create({ products, amount, address, userId })
            return res.status(201).json(order)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async getAll(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const orders = await Order.find({ userId }).populate("products")
            return res.json(orders)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async delete(req, res) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const orderId = req.params.id
            if (!orderId) return res.status(400).send()

            const order = await Order.findOneAndDelete({ _id: orderId })
            return res.json(order)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async updateStatus(req, res) {
        try {
            const id = req.params.id
            if (!id) return res.status(400).send()

            const order = await Order.findOneAndUpdate({ _id: id }, { status: req.body.status }, { new: true })
            if (!order) return res.status(400).send()

            return res.json(order)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async adminGet(req, res) {
        try {
            const orders = await Order.find()
            return res.json(orders)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }

}

export default new OrderController()
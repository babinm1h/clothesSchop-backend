import { Product } from "../models/product.js"

class ProductController {

    async create(req, res) {
        try {
            const productData = req.body
            if (!productData) return res.status(400).send()
            const product = await Product.create(productData)
            return res.status(201).json(product)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async getAll(req, res) {
        try {
            const { color, category } = req.query
            let products;

            if (color && !category) {
                products = await Product.find({ color: color })
            }
            if (category && !color) {
                products = await Product.find({ categories: { $in: [category] } })
            }
            if (color && category) {
                products = await Product.find({
                    categories: { $in: [category] },
                    color: { $in: [color] }
                })
            }
            if (!category && !color) {
                products = await Product.find()
            }

            return res.json(products)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send()
            const product = await Product.findById(id)
            return res.json(product)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async update(req, res) {
        try {
            const { id } = req.params
            const updatedProduct = await Product.findByIdAndUpdate(id, { $set: req.body })
            return res.json(updatedProduct)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


}

export default new ProductController()
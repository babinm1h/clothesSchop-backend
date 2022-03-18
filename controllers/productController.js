import cloudinary from "../middleware/cloudinary.js"
import { Product } from "../models/product.js"

class ProductController {

    async create(req, res) {
        try {
            const file = req.file
            if (!file) return res.status(400).send()

            const productData = req.body
            if (!productData) return res.status(400).send()

            cloudinary.v2.uploader.upload_stream({ folder: "admin" }, async (err, result) => {
                if (err || !result) throw new Error(`Cloudinary err0r`)

                const url = result.secure_url
                const product = await Product.create({
                    ...productData, img: url,
                    categories: productData.categories.split(","),
                    size: productData.size.split(","),
                    color: productData.color.split(","),
                })
                return res.status(201).json(product)


            }).end(file.buffer)


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


    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send()
            const product = await Product.findByIdAndDelete(id)
            return res.json(product)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }

}

export default new ProductController()
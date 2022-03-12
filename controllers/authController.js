import bcrypt from "bcryptjs"
import { User } from "../models/user.js"
import jwt from "jsonwebtoken"
import { Cart } from "../models/cart.js"


const generateJwt = (id, email, isAdmin) => {
    return jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

class AuthController {

    async register(req, res) {
        try {
            const { username, email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "Такой email уже используется" })

            const hashedPassword = await bcrypt.hash(password, 6)
            const user = await User.create({ email, username, password: hashedPassword })
            const cart = await Cart.create({ userId: user._id })
            const token = generateJwt(user._id, email, user.isAdmin)
            return res.status(201).json(token)


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: "Пользователь с таким email не найден" })
            }
            const comparedPassword = await bcrypt.compare(password, user.password)
            if (!comparedPassword) return res.status(400).json({ message: "Неверный пароль" })

            const token = generateJwt(user._id, email, user.isAdmin)
            return res.json(token)

        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


    async check(req, res) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.isAdmin)
            return res.json(token)
        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


}

export default new AuthController()
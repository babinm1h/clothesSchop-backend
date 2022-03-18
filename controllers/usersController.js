import { User } from "../models/user.js"


class UsersController {

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({ message: "Ошибка" })
            const user = await User.findByIdAndDelete(id)
            if (!user) return res.status(404).json({ message: "Пользователь не найден" })
            return res.json(user)

        } catch (err) {
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }


    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({ message: "Ошибка" })
            const user = await User.findById(id)
            if (!user) return res.status(404).json({ message: "Пользователь не найден" })
            return res.json(user)

        } catch (err) {
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }


    async getAll(req, res) {
        try {
            const users = await User.find()
            return res.json(users)

        } catch (err) {
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }


}

export default new UsersController()
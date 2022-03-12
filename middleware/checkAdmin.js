import jwt from "jsonwebtoken"

export const checkAdmin = (req, res, next) => {
    if (req.method === "OPTIONS") return next()

    try {
        if (!req.headers.authorization) return res.status(401).json({ message: "Не авторизован" })
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(401).json({ message: "Не авторизован" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded.isAdmin) return res.status(403).json({ message: "Нет доступа" })

        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({ message: "Не авторизован" })
    }
}
import { Router } from "express";
import authController from "../controllers/authController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const authRouter = new Router()

authRouter.get('/check', checkAuth, authController.check)
authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
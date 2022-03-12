import { Router } from "express";
import { cartRouter } from "./cartRouter.js";
import { orderRouter } from "./orderRouter.js";
import { productRouter } from "./productRouter.js";
import { authRouter } from "./authRouter.js";
import { usersRouter } from "./usersRouter.js";


export const router = new Router()


router.use(`/auth`, authRouter)
router.use(`/cart`, cartRouter)
router.use(`/products`, productRouter)
router.use(`/order`, orderRouter)
router.use("/users", usersRouter)
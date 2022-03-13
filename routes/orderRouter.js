import { Router } from "express";
import orderController from "../controllers/orderController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const orderRouter = new Router()


orderRouter.get("/", checkAuth, orderController.getAll)
orderRouter.post("/", checkAuth, orderController.create)
orderRouter.delete("/:id", checkAuth, orderController.delete)
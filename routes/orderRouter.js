import { Router } from "express";
import orderController from "../controllers/orderController.js";


export const orderRouter = new Router()


orderRouter.get("/", orderController.getAll)
orderRouter.post("/", orderController.create)
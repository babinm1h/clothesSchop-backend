import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { checkAuth } from "../middleware/checkAuth.js"

export const cartRouter = new Router()


cartRouter.get("/", checkAuth, cartController.get)
cartRouter.post("/:id", checkAuth, cartController.create)
cartRouter.delete("/:id", checkAuth, cartController.delete)
cartRouter.put("/add/:id", checkAuth, cartController.addOne)
cartRouter.put("/remove/:id", checkAuth, cartController.removeOne)
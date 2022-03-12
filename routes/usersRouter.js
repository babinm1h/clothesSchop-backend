import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { checkAdmin } from "../middleware/checkAdmin.js"
import usersController from "../controllers/usersController.js";


export const usersRouter = new Router()


usersRouter.delete("/:id", checkAdmin, usersController.deleteOne)
usersRouter.get("/:id", usersController.getOne)
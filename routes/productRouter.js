import { Router } from "express";
import productController from "../controllers/productController.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { upload } from "../middleware/multer.js";


export const productRouter = new Router()


productRouter.get("/", productController.getAll)
productRouter.get("/:id", productController.getOne)
productRouter.post("/", checkAdmin, upload.single("img"), productController.create)
productRouter.put("/:id", checkAdmin, productController.update)
productRouter.delete("/:id", productController.delete)

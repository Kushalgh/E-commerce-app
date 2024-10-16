import express from "express";
import * as productController from "./product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;

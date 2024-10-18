import express from "express";
import * as orderController from "./order.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, orderController.createOrder);
router.get("/users", authMiddleware, orderController.getUserOrders);
router.get("/:id", authMiddleware, orderController.getOrder);
router.put("/:id", authMiddleware, orderController.updateOrder);

export default router;

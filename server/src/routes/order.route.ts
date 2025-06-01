import { Router } from "express";
import OrderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/:id", OrderController.getOrder);

export default orderRouter;

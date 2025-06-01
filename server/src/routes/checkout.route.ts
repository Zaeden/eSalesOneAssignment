import express from "express";
import CheckoutController from "../controllers/checkout.controller";

const checkoutRouter = express.Router();

checkoutRouter.post("/", CheckoutController.createCheckout);

export default checkoutRouter;

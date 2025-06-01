import ProductController from "../controllers/product.controller";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", ProductController.getProduct);
export default productRouter;

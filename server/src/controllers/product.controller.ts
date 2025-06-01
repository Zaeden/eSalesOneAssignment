import prisma from "../configs/db.config";
import { Request, Response } from "express";

class ProductController {
  static async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await prisma.product.findFirst();
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(product);
    } catch (err) {
      console.error("Fetch product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default ProductController;

import { Router, Request, Response } from "express";
import prisma from "../configs/db.config";

const orderRouter = Router();

orderRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default orderRouter;

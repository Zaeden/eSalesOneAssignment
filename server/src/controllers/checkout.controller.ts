import { Request, Response } from "express";
import prisma from "../configs/db.config";
import { simulatePayment } from "../utils/simulatePayment";
import { sendConfirmationEmail } from "../utils/sendEmail";
import { orderApprovedTemplate } from "../templates/orderApproved";
import { orderDeclinedTemplate } from "../templates/orderDeclined";
import { checkoutSchema } from "../validations/checkout.validation";

class CheckoutController {
  static async createCheckout(req: Request, res: Response): Promise<void> {
    try {
      const payload = checkoutSchema.safeParse(req.body);

      if (!payload.success) {
        res.status(400).json({
          message: "Validation error",
          errors: payload.error.format(),
        });
        return;
      }
      const {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        cardNumber,
        expiry,
        cvv,
        product,
      } = payload.data;

      const transactionResult = simulatePayment(cardNumber);

      if (transactionResult === "DECLINED") {
        await sendConfirmationEmail(
          email,
          "Your Transaction Was Declined",
          orderDeclinedTemplate(fullName, "Transaction declined by bank")
        );
        res.status(402).json({
          status: "DECLINED",
          message: "Transaction declined by bank",
        });
        return;
      }

      if (transactionResult === "GATEWAY_ERROR") {
        await sendConfirmationEmail(
          email,
          "Payment Gateway Failed",
          orderDeclinedTemplate(
            fullName,
            "Payment gateway error. Try again later."
          )
        );
        res
          .status(503)
          .json({ status: "GATEWAY_ERROR", message: "Payment gateway error" });
        return;
      }

      const dbProduct = await prisma.product.findFirst({
        where: { title: product.title },
      });

      if (!dbProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      if (dbProduct.inventory < product.quantity) {
        res.status(400).json({ message: "Not enough stock available" });
        return;
      }

      const customer = await prisma.customer.create({
        data: { fullName, email, phone, address, city, state, zip },
      });

      await prisma.product.update({
        where: { id: dbProduct.id },
        data: {
          inventory: {
            decrement: product.quantity,
          },
        },
      });

      const order = await prisma.order.create({
        data: {
          product: product.title,
          color: product.variant.color,
          size: product.variant.size,
          quantity: product.quantity,
          price: product.price * product.quantity,
          status: "APPROVED",
          customerId: customer.id,
          productRefId: dbProduct.id,
        },
      });

      await sendConfirmationEmail(
        email,
        "Your Order is Confirmed!",
        orderApprovedTemplate(order.id, fullName, product)
      );

      res.status(200).json({
        status: "APPROVED",
        orderId: order.id,
        customerName: customer.fullName,
        total: order.price,
      });
    } catch (err) {
      console.error("Checkout error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default CheckoutController;

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import checkoutRouter from "./routes/checkout.route";
import orderRouter from "./routes/order.route";
import productRouter from "./routes/product.route";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/product", productRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

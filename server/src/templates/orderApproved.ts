import { getColorName } from "../utils/getColorName";

export const orderApprovedTemplate = (
  orderId: string,
  name: string,
  product: any
) => `
  <h2>✅ Your Order is Confirmed!</h2>
  <p>Hi ${name},</p>
  <p>Your order <strong>#${orderId}</strong> has been successfully placed.</p>
  <ul>
    <li><strong>Product:</strong> ${product.title}</li>
    <li><strong>Variant:</strong> ${getColorName(product.variant.color)} / ${
  product.variant.size
}</li>
    <li><strong>Quantity:</strong> ${product.quantity}</li>
    <li><strong>Total:</strong> $${product.price * product.quantity}</li>
  </ul>
  <p>Thank you for shopping with us!</p>
`;

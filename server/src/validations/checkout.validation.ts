import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().regex(/^\d{5,6}$/, "Zip must be 5 or 6 digits"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),

  product: z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
    quantity: z.number().min(1),
    variant: z.object({
      color: z.string(),
      size: z.string(),
    }),
  }),
});

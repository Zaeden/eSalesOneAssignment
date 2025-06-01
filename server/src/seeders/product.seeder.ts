import prisma from "../configs/db.config";

async function seedProduct() {
  console.log("Seeding product...");
  await prisma.product.create({
    data: {
      title: "Basic Tee",
      description:
        "The Basic Tee is soft, breathable, and perfect for daily wear.",
      price: 35,
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
      inventory: 10,
      colors: ["#111827", "#E5E7EB", "#43FAC3"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  });
  console.log("Product seeded successfully.");
}

seedProduct();

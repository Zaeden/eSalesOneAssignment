import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getColorName } from "../utils/getColorName";
import { FaSpinner } from "react-icons/fa";

const ThankYouPage = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin mx-auto text-5xl" />
      </div>
    );
  }

  if (!order)
    return <p className="text-center mt-10 text-red-500">Order not found.</p>;

  const customer = order.customer;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <h1 className="text-4xl font-bold text-green-600">✅ Order Confirmed!</h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase, {customer.fullName}!
      </p>

      <div className="mt-6 text-left bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Product:</strong> {order.product}
        </p>
        <p>
          <strong>Variant:</strong> {getColorName(order.color)} / {order.size}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Total:</strong> ${order.price}
        </p>
      </div>

      <div className="mt-6 text-left bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
        <p>
          <strong>Name:</strong> {customer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone}
        </p>
        <p>
          <strong>Address:</strong> {customer.address}, {customer.city},{" "}
          {customer.state} - {customer.zip}
        </p>
      </div>

      <p className="mt-8 text-lg font-medium">
        📦 Your order is being processed. We’ll notify you when it ships!
      </p>
    </div>
  );
};

export default ThankYouPage;

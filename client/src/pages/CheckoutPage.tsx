import { useRef, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getColorName } from "../utils/getColorName";
import { FaSpinner } from "react-icons/fa";
import Toast from "../utils/Toast";
import { API_BASE_URL } from "../components/ProductCard";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { product } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product,
        }),
      });

      const result = await res.json();

      if (res.ok && result.status === "APPROVED") {
        // Redirect to Thank You Page with orderId
        navigate(`/thank-you?orderId=${result.orderId}`);
      } else {
        Toast(`${result.status}: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      Toast(`Something went wrong. Try again later.`, "error");
    } finally {
      setLoading(false);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 justify-start gap-10 p-6">
      {/* Left - Form */}
      <div>
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <form
          ref={formRef}
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded focus:outline-blue-600"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-blue-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Phone */}
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^\d{10}$/, message: "Enter 10-digit number" },
            })}
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded focus:outline-blue-600"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Address */}
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="w-full border px-3 py-2 rounded focus:outline-blue-600"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* City / State / Zip */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
            <input
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className="border px-3 py-2 rounded focus:outline-blue-600"
            />
            <input
              {...register("state", { required: "State is required" })}
              placeholder="State"
              className="border px-3 py-2 rounded focus:outline-blue-600"
            />
            <input
              {...register("zip", {
                required: "Zip code is required",
                pattern: { value: /^\d{5,6}$/, message: "Invalid zip code" },
              })}
              placeholder="Zip Code"
              className="border px-3 py-2 rounded focus:outline-blue-600"
            />
          </div>
          {(errors.city || errors.state || errors.zip) && (
            <p className="text-red-500 text-sm">
              {errors.city?.message ||
                errors.state?.message ||
                errors.zip?.message}
            </p>
          )}

          {/* Card Number */}
          <input
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Enter 16-digit card number",
              },
            })}
            placeholder="Card Number (16 digits)"
            className="w-full border px-3 py-2 rounded focus:outline-blue-600"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}

          {/* Expiry / CVV */}
          <div className="flex gap-2">
            <input
              {...register("expiry", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Use MM/YY format",
                },
                validate: (value) => {
                  const [monthStr, yearStr] = value.split("/");

                  if (!monthStr || !yearStr) return "Invalid expiry format";

                  const inputMonth = parseInt(monthStr, 10);
                  const inputYear = parseInt("20" + yearStr, 10);

                  const now = new Date();
                  const currentMonth = now.getMonth() + 1; // Jan = 0, so +1
                  const currentYear = now.getFullYear();

                  if (inputYear < currentYear) return "Card is expired";
                  if (inputYear === currentYear && inputMonth < currentMonth)
                    return "Card is expired";

                  return true;
                },
              })}
              placeholder="Expiry Date (MM/YY)"
              className="w-1/2 border px-3 py-2 rounded focus:outline-blue-600"
            />

            <input
              {...register("cvv", {
                required: "CVV is required",
                pattern: { value: /^\d{3}$/, message: "3-digit CVV required" },
              })}
              placeholder="CVV"
              className="w-1/2 border px-3 py-2 rounded focus:outline-blue-600"
            />
          </div>
          {(errors.expiry || errors.cvv) && (
            <p className="text-red-500 text-sm">
              {errors.expiry?.message || errors.cvv?.message}
            </p>
          )}
        </form>
      </div>

      {/* Right - Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex items-center gap-4 mb-2">
          <img src={product.image} alt="Product" className="w-20 rounded" />
          <div>
            <p className="font-medium">{product.title}</p>
            <p className="text-sm text-gray-500">
              {getColorName(product.variant.color ?? "")} /{" "}
              {product.variant.size ?? ""}
            </p>
            <p>Qty: {product.quantity}</p>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${product.price * product.quantity}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <p>Total</p>
            <p>${product.price * product.quantity}</p>
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          className="h-10 mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          onClick={() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }}
        >
          {loading ? (
            <FaSpinner className="animate-spin mx-auto" />
          ) : (
            "Confirm Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

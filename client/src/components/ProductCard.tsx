import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import Loader from "./Loader";
import Toast from "../utils/Toast";

const ProductCard = () => {
  const navigate = useNavigate();
  const setProduct = useCartStore((state) => state.setProduct);

  const [product, setProductData] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProductData(data);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
      } catch (err) {
        Toast("Failed to load product. Please try again later.", "error");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <Loader />;

  const handleBuyNow = () => {
    setProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      variant: {
        color: selectedColor,
        size: selectedSize,
      },
      quantity,
    });
    navigate("/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 p-4 bg-white shadow-xl rounded-lg">
      <div>
        <img
          src={product.image}
          alt="Product"
          className="rounded-lg w-80 h-[450px]"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-700 text-lg font-semibold mt-1">
            ${product.price}
          </p>
          <p className="text-gray-700 text-sm mt-3">{product.description}</p>

          {/* Color Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="flex gap-3">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? `ring-2 ring-offset-2` : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    boxShadow:
                      selectedColor === color
                        ? `0 0 0 3px ${color}, 0 0 0 1px white`
                        : "",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  className={`w-16 h-10 text-sm font-medium border rounded flex items-center justify-center transition ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:border-blue-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 text-lg text-white font-bold border rounded bg-black"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) setQuantity(val);
                }}
                className="w-14 h-10 text-center border rounded focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 text-lg text-white font-bold border rounded bg-black"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

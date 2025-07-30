"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch } from "@/app/Redux/store";
import { fetchProducts, addToCart } from "@/app/Redux/cartSlice";
import { Minus, ShoppingCart, Plus, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Loader from "@/app/components/Loader";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  type: string;
  color: string;
  team: string;
}

export default function ProductDetails() {
  const params = useParams();
  //   const team = Array.isArray(params.team) ? params.team[0] : params.team;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: any) => state.allCart);
  console.log("🛒 Items in Cart:", items);
  const [data, setData] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      axios
        .get<{ product: Product }>(
          `https://shopping-store-alpha-eight.vercel.app/api/v1/teams/teamName/${id}`
        )
        .then((res) => {
          setData(res.data.product);
          console.log("✅ Product fetched from API:", res.data.product);
        })
        .catch((err) => {
          console.error("❌ Error fetching product:", err);
        });
    }
  }, [id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  const handleAddToCart = async () => {
    if (!data || isLoading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      return;
    }

    try {
      setIsLoading(true);
      dispatch(addToCart(data));
      toast.success("Item added to cart!");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return <p className="text-white p-4">Loading product...</p>;

  return isLoading ? (
    <div className="flex justify-center mb-4">
      <Loader />
    </div>
  ) : (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-4 py-16 flex flex-col lg:flex-row items-start gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left - Image */}
      <div className="w-full lg:w-1/2 flex justify-center relative group mt-[40px]">
        <Image
          src={data.image}
          alt={data.name}
          className="w-full max-w-md rounded-xl shadow-2xl object-contain bg-white p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Right - Product Info */}
      <div className="w-full lg:w-1/2 space-y-6 mt-[40px]">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FACC15] drop-shadow">
          {data.name}
        </h1>
        <p className="text-sm text-gray-300 uppercase tracking-wide">
          {data.type}
        </p>
        <p className="text-2xl text-green-500 font-bold">
          ${data.price.toFixed(2)}
        </p>
        <p className="text-gray-200 leading-relaxed">
          {data.description ||
            "This premium jersey is crafted for true cricket fans. Lightweight, breathable, and designed with official team colors—perfect for game days or casual wear."}
        </p>

        {/* Size Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Choose Size:</label>
          <div className="flex gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded text-sm transition ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold">Quantity:</label>
          <div className="flex items-center border border-gray-500 rounded overflow-hidden">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-1 hover:bg-[#FACC15] hover:text-black transition"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-1 hover:bg-[#FACC15] hover:text-black transition"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleBuyNow}
            className="flex items-center gap-2 justify-center bg-[#FACC15] text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
          >
            <CheckCircle size={18} /> Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex items-center gap-2 justify-center border border-[#FACC15] text-[#FACC15] px-6 py-3 rounded-full hover:bg-[#FACC15] hover:text-black transition disabled:opacity-50"
          >
            <ShoppingCart size={18} /> {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          ✔ 100% Original • 🚚 Fast Delivery • 🔐 Secure Checkout
        </div>
      </div>
    </motion.div>
  );
}

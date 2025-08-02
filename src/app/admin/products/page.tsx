"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader } from "lucide-react";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/getProduct"
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalProducts = products.length;

  return (
    <div className="p-6 md:p-10 bg-[#1E293B] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        Product Inventory
      </h1>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">
            Total Products
          </h2>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            {totalProducts}
          </p>
        </div>
        <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Stock</h2>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            {totalStock}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader className="animate-spin text-yellow-400" size={32} />
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#0F172A] border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-yellow-400">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-green-400">
                    ${product.price}
                  </span>
                  <span className="text-sm bg-gray-700 px-2 py-1 rounded-md text-white">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  <p>Type: {product.type}</p>
                  <p>Color: {product.color}</p>
                  <p>Team: {product.team}</p>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button className="text-sm px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-300 transition">
                    Edit
                  </button>
                  <button className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

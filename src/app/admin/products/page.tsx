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

      <div className="overflow-x-auto mt-6">
        {loading ? (
          <p className="text-white">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-white">No products available.</p>
        ) : (
          <table className="min-w-full bg-[#0F172A] text-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#1E293B]">
              <tr>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Team</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.type}</td>
                  <td className="p-3">{product.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/getProduct"
        );
        const data = await res.json();
        setProducts(data?.products || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products
    .reduce((sum, p) => sum + p.price * p.stock, 0)
    .toFixed(2);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-yellow-400">Product Inventory</h1>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <div className="bg-yellow-400 p-4 rounded-xl shadow-lg text-center">
          <p className="text-sm">Total Products</p>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-yellow-400 p-4 rounded-xl shadow-lg text-center">
          <p className="text-sm">Total Stock</p>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>
        <div className="bg-yellow-400 p-4 rounded-xl shadow-lg text-center">
          <p className="text-sm">Total Value</p>
          <p className="text-2xl font-bold">${totalValue}</p>
        </div>
      </div>

      {/* Products Table */}
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

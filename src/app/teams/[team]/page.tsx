"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCard from "@/app/components/ProductCard";
import { Triangle } from "react-loader-spinner";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  team: string;
  tag?: string;
}

const TeamPage = () => {
  const params = useParams();
  const teamParam = params?.team;

  const team = Array.isArray(teamParam) ? teamParam[0] : teamParam || ""; // fallback to empty string

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!team) return setLoading(true);
        const res = await axios.get<{ products: Product[] }>(
          `https://shopping-store-alpha-eight.vercel.app/api/v1/team/${team}`
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [team]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return loading ? (
    <div className="flex justify-center mb-4">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#FACC15"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-[310px] bg-[#1E293B] px-5 py-[100px]">
        <div className="space-y-3">
          <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md text-sm">
            All Jerseys
          </button>
          <button className="w-full bg-[#334155] text-white font-bold py-2 rounded-md text-sm">
            Best Sellers
          </button>
          <button className="w-full bg-[#334155] text-white font-bold py-2 rounded-md text-sm">
            World Cup
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold text-sm">
            Search Jerseys
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full px-3 py-2 rounded-md bg-[#0F172A] border border-gray-600 text-white placeholder-gray-400 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-10">
        <h1 className="text-5xl font-extrabold text-yellow-400 mt-[60px] text-center tracking-wide">
          {team.toUpperCase()} JERSEYS
        </h1>
        <p className="mt-2 text-gray-300 text-lg text-center">
          {filteredProducts.length} results · Official 2024 Kits
        </p>

        {/* Product Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div key={product._id} whileHover={{ scale: 1.03 }}>
                <ProductCard product={product} team={team} />
              </motion.div>
            ))
          ) : (
            <p className="text-white">No jerseys found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamPage;

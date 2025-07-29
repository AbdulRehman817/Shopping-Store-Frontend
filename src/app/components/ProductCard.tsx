"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
  type?: string;
}

const ProductCard = ({
  product,
}: {
  product: Product;
  team: string | string[];
}) => {
  // ✅ Ensure team is a string (in case it's a dynamic route param  like ["IPL"])

  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-lg bg-[#0F172A] hover:shadow-2xl transition-transform duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <Link href={`/teams/teamName/${product._id}`}>
        {/* Image Section */}
        <div className="relative bg-[#F1F5F9] p-4 h-60 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            className="max-h-full object-contain"
          />

          {/* Tag */}
        </div>

        {/* Info Section */}
        <div className="bg-[#1E293B] text-white p-4 space-y-2">
          <h3 className="text-lg font-bold text-[#FACC15] line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-300 capitalize">{product.type}</p>

          <div className="flex justify-between items-center pt-2">
            <p className="text-xl font-bold text-white">${product.price}</p>

            {/* Optional: Rating */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

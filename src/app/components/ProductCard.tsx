"use client";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white block rounded-lg overflow-hidden shadow-md">
        {/* Bestseller Tag */}
        {product.tag === "bestseller" && (
          <div className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm inline-block ml-4 mt-4">
            🔥 Bestseller
          </div>
        )}
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain "
        />
        {/* Details */}
        <div className="p-4 bg-[#1E293B]">
          <h3 className="text-lg font-bold text-[#FACC15] ">{product.name}</h3>
          {product.tag === "bestseller" && (
            <p className="text-sm text-gray-600 mb-1">World Cup</p>
          )}
          <p className="text-sm  text-gray-600 ">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

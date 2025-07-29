"use client"; // * Next.js ka client-side rendering activate karne ke liye

// ? Redux se hooks import kar rahe hain state aur dispatch ke liye
import { useSelector, useDispatch } from "react-redux";

// ? Icons import kar rahe hain buttons ke liye
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

// ? useEffect React hook for side effects
import { useEffect } from "react";

// ? Redux slice ke actions import kar rahe hain
import {
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setCart,
} from "../Redux/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

// * Product ka Type define kar rahe hain strongly typed data ke liye
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// * Redux ke global state ka type define kiya hai
interface RootState {
  allCart: {
    cart: Product[]; // ! cart ek array hoga Product type ka
  };
}

export default function CartDropdown() {
  const dispatch = useDispatch(); // ? Redux actions ko dispatch karne ke liye
  const router = useRouter();
  // * Redux se cart ki state le rahe hain
  const cart = useSelector((state: RootState) => state.allCart.cart || []);

  // ! LocalStorage se cart data retrieve karke Redux state mein set karte hain on load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart))); // ? Agar cart mil jaye to setCart action call karte hain
    }
  }, [dispatch]);

  // ! Har bar jab cart update ho to localStorage bhi update ho
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // ? Quantity increase karne ke liye handler function
  const handleIncrease = (item: Product) => {
    dispatch(increaseItemQuantity(item));
  };

  // ? Quantity decrease karne ke liye handler function
  const handleDecrease = (item: Product) => {
    dispatch(decreaseItemQuantity(item));
  };

  // ? Item ko cart se remove karne ka handler
  const handleDelete = (id: string) => dispatch(removeItem(id));

  // * Total price calculate karne ka function
  const getTotalPrice = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="absolute top-16 right-4 w-[90vw] max-w-md bg-[#1e293b] text-white rounded-2xl shadow-xl p-5 z-50">
      {/* * Heading */}
      <h2 className="text-2xl font-bold text-[#facc15] mb-4 text-center">
        🛒 Cart
      </h2>

      {/* ? Agar cart khali ho to message show hoga */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* * Har cart item ko map karke dikhate hain */}
          {cart.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-[#334155] rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              {/* * Product image */}
              <Image
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md border border-gray-500"
              />

              {/* * Product name & price */}
              <div className="flex-1 mx-3">
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-xs text-gray-400">
                  ${item.price.toFixed(2)}
                </p>

                {/* * Increase / Decrease buttons with quantity */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="w-6 h-6 flex items-center justify-center bg-[#0f172a] text-[#facc15] text-xs rounded hover:bg-[#facc15] hover:text-black"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-sm font-bold text-[#facc15]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="w-6 h-6 flex items-center justify-center bg-[#0f172a] text-[#facc15] text-xs rounded hover:bg-[#facc15] hover:text-black"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* * Delete button */}
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* * Total price section */}
          <div className="flex justify-between items-center border-t border-gray-600 pt-4 text-lg font-semibold">
            <span className="text-gray-300">Total</span>
            <span className="text-[#facc15]">${getTotalPrice()}</span>
          </div>
          {cart.length > 3 ? (
            <button
              onClick={() => router.push("/cart")}
              className="w-full py-2 mt-4 bg-[#facc15] text-[#1e293b] font-bold rounded hover:bg-yellow-300 transition"
            >
              Go to cart
            </button>
          ) : (
            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-2 mt-4 bg-[#facc15] text-[#1e293b] font-bold rounded hover:bg-yellow-300 transition"
            >
              Go to checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}

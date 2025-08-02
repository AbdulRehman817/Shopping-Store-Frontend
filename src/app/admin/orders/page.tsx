"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";
interface OrderItem {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
  };
}
interface Order {
  _id: string;
  shippingInfo: {
    fullName: string;
    items: OrderItem[];
    email: string;
    address: string;
    phone: string;
  };
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/admin/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
        console.error(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setOrders([]);
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const token = localStorage.getItem("token");
    await fetch(
      `https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/admin/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    fetchOrders();
  };

  return (
    <AdminLayout>
      <div className="mt-[30px] p-4 sm:p-6 sm:mt-[30px] md:p-8 md:mt-[30px]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-2 mt-5">
          🛒 All Orders
        </h1>

        <div className="w-full overflow-x-auto bg-[#0F172A] rounded-xl shadow-lg border border-gray-800">
          <table className="min-w-[800px] w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-[#1E293B] text-gray-400">
              <tr>
                <th className="p-3 sm:p-4">Customer</th>
                <th className="p-3 sm:p-4">Email</th>
                <th className="p-3 sm:p-4">Address</th>
                <th className="p-3 sm:p-4">Total</th>
                <th className="p-3 sm:p-4">Date</th>
                <th className="p-3 sm:p-4">Status</th>
                <th className="p-3 text-left text-sm font-semibold">Items</th>
                <th className="p-3 sm:p-4">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-700 hover:bg-[#1F2937] transition duration-200"
                >
                  <td className="p-3 sm:p-4 font-semibold">
                    {order.shippingInfo?.fullName}
                  </td>
                  <td className="p-3 sm:p-4">{order.shippingInfo?.email}</td>
                  <td className="p-3 sm:p-4">{order.shippingInfo?.address}</td>

                  <td className="p-3 sm:p-4 text-green-400">
                    ${order.totalAmount}
                  </td>
                  <td className="p-3 sm:p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          order.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : order.status === "processing"
                            ? "bg-blue-500/20 text-blue-400"
                            : order.status === "shipped"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <ul className="space-y-1">
                      {order.shippingInfo?.items?.map((item) => (
                        <li key={item._id} className="text-sm text-gray-300">
                          {item.productId?.name || item.productId?._id} ×{" "}
                          {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 sm:p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-[#0F172A] border border-gray-600 text-yellow-400 px-3 py-1 rounded outline-none w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// interface OrderItem {
//   _id: string;
//   quantity: number;
//   productId: {
//     _id: string;
//     name: string;
//   };
// }

// interface Order {
//   _id: string;
//   shippingInfo: {
//     fullName: string;
//     email: string;
//     address: string;
//     phone: string;
//     items: OrderItem[];
//   };
//   totalAmount: number;
//   orderStatus: string;
//   createdAt: string;
// }

// const OrdersPage = () => {
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("/api/v1/order/all");
//         setOrders(res.data.orders);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="overflow-x-auto mt-5">
//       <h1 className="text-2xl font-bold text-white mb-4">All Orders</h1>
//       <table className="min-w-full divide-y divide-gray-700 bg-[#111827] shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-[#1F2937] text-gray-300">
//           <tr>
//             <th className="p-3 text-left text-sm font-semibold">Name</th>
//             <th className="p-3 text-left text-sm font-semibold">Email</th>
//             <th className="p-3 text-left text-sm font-semibold">Address</th>
//             <th className="p-3 text-left text-sm font-semibold">Items</th>
//             <th className="p-3 text-left text-sm font-semibold">Total</th>
//             <th className="p-3 text-left text-sm font-semibold">Status</th>
//             <th className="p-3 text-left text-sm font-semibold">Update</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700 text-white">
//           {orders.map((order) => (
//             <tr
//               key={order._id}
//               className="border-b border-gray-700 hover:bg-[#1F2937] transition duration-200"
//             >
//               <td className="p-3 sm:p-4 font-semibold">{order.shippingInfo?.fullName}</td>
//               <td className="p-3 sm:p-4">{order.shippingInfo?.email}</td>
//               <td className="p-3 sm:p-4">{order.shippingInfo?.address}</td>
//               <td className="p-3 sm:p-4">
//                 <ul className="space-y-1">
//                   {order.shippingInfo?.items?.map((item) => (
//                     <li key={item._id} className="text-sm text-gray-300">
//                       {item.productId?.name || item.productId?._id} × {item.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </td>
//               <td className="p-3 sm:p-4 text-green-400">
//                 ${order.totalAmount.toFixed(2)}
//               </td>
//               <td className="p-3 sm:p-4 capitalize text-yellow-400">
//                 {order.orderStatus}
//               </td>
//               <td className="p-3 sm:p-4">
//                 <Link
//                   href={`/admin/updateorder/${order._id}`}
//                   className="text-blue-500 hover:text-blue-700"
//                 >
//                   <FaEdit />
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrdersPage;

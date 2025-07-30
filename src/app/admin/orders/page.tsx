"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";

interface Order {
  _id: string;
  shippingInfo: {
    fullName: string;
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
      "https://shopping-store-alpha-eight.vercel.app/api/v1/admin/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const token = localStorage.getItem("token");
    await fetch(
      `https://shopping-store-alpha-eight.vercel.app/api/v1/admin/orders/${orderId}`,
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
                    ${order.totalAmount.toFixed(2)}
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

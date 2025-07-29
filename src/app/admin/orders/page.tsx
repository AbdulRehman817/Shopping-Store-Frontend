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
    const res = await fetch("http://localhost:3000/api/v1/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/v1/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Email</th>

              <th className="p-2">Address</th>

              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-700 hover:bg-gray-900"
              >
                <td className="p-2">{order.shippingInfo?.fullName}</td>
                <td className="p-2">{order.shippingInfo?.email}</td>

                <td className="p-2">{order.shippingInfo?.address}</td>

                <td className="p-2">${order.totalAmount}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="bg-[#0F172A] border border-gray-600 text-[#facc15] p-1 rounded"
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
      </div>
    </AdminLayout>
  );
}

// src/app/dashboard/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://shopping-store-h2vg.vercel.app/api/v1/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      const filteredUser = data.filter((user: User) => user.role !== "admin");
      setUsers(filteredUser || []);
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="bg-[#0F172A] p-6 rounded-lg shadow-xl mt-[20px]">
        <h1 className="text-3xl font-bold text-[#facc15] mb-6 border-b pb-2 border-gray-700">
          👥 All Registered Users
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden text-sm">
            <thead className="bg-[#1E293B] text-[#facc15]">
              <tr>
                <th className="py-3 px-4 text-left border-b border-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-600">
                  Email
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-600">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-[#1F2937] transition-colors border-b border-gray-700"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <p className="text-gray-400 mt-4 text-center italic">
            No users found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}

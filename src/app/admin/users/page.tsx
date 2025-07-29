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
      const res = await fetch("http://localhost:3000/api/v1/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const filteredUser = data.filter((user: User) => user.role !== "admin");
      console.log("Fetched users:", filteredUser);
      setUsers(filteredUser || []);
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-gray-700 hover:bg-gray-900"
            >
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

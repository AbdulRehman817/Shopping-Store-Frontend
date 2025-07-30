"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registered successfully!");
        router.push("/login");
      } else {
        setMessage(data.message || "❌ Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInput}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInput}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <select
          name="role"
          value={user.role}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
          className="w-full mb-4 px-4 py-2 border rounded"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
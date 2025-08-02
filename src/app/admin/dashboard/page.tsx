"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import AdminGuard from "@/app/components/AdminGuard";
import Loader from "@/app/components/Loader";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AdminGuard>
      <AdminLayout>
        <h1 className="text-3xl font-bold mb-4 mt-[30px]">
          Welcome to Admin Dashboard
        </h1>
        <p>This is your overview page.</p>
      </AdminLayout>
    </AdminGuard>
  );
}

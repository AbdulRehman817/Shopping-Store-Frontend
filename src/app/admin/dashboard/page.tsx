"use client";
import AdminLayout from "@/app/components/AdminLayout";
import AdminGuard from "@/app/components/AdminGuard";

export default function DashboardPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
        <p>This is your overview page.</p>
      </AdminLayout>
    </AdminGuard>
  );
}

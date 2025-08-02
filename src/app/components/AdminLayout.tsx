"use client";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-red-400">Admin Panel</h1>
        <div className="space-x-6">
          <Link href="/admin/dashboard" className="hover:text-red-400">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="hover:text-red-400">
            Orders
          </Link>
          <Link href="/admin/products" className="hover:text-red-400">
            Products
          </Link>
          <Link href="/admin/users" className="hover:text-red-400">
            Users
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-6 overflow-x-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;

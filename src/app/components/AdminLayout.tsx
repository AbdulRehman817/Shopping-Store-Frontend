// src/app/components/AdminLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Users", href: "/admin/users" },
  { name: "Orders", href: "/admin/orders" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-[#facc15] ">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] border-r border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded hover:bg-gray-800 transition ${
                pathname === item.href ? "bg-gray-800 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

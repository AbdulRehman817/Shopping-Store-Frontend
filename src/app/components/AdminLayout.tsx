"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ClipboardList } from "lucide-react";

const navItems = [
  { name: "Users", href: "/admin/users", icon: <Users size={18} /> },
  { name: "Orders", href: "/admin/orders", icon: <ClipboardList size={18} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] border-r border-gray-700 p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-10 text-yellow-400 tracking-wide">
          Admin Panel
        </h2>
        <nav className="space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-400 text-black font-semibold shadow-md"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-[#1E293B] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ClipboardList, PackageSearch, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Users", href: "/admin/users", icon: <Users size={18} /> },
  { name: "Orders", href: "/admin/orders", icon: <ClipboardList size={18} /> },
  {
    name: "Products",
    href: "/admin/products",
    icon: <PackageSearch size={18} />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <ClipboardList size={18} />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      {/* Top Navbar */}
      <header className="bg-[#0F172A] shadow-md px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
          Admin Panel
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Menu size={28} />
        </button>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
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
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F172A] px-4 pb-4 space-y-2 border-b border-gray-700">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
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
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 md:p-10">{children}</main>
    </div>
  );
}

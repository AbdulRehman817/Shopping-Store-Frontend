"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import { useRouter } from "next/navigation";

import { ShieldCheck, Mail, UserCircle2, Crown, X } from "lucide-react";

interface AdminUser {
  name: string;
  email: string;
  role: string;
  image?: string;
  _id: string;
}

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you store token separately
    router.push("/login"); // change this to your actual login route
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setAdmin(parsedUser);
        setFormData({ name: parsedUser.name, email: parsedUser.email });
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!admin) return;
    setLoading(true);

    try {
      const updatedUser = {
        ...admin,
        ...formData, // updated name & email
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setAdmin(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile in localStorage", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mt-12 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400" />
            Admin Profile Settings
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-500 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto">
          {!admin ? (
            <p className="text-gray-400 text-center">Loading admin info...</p>
          ) : (
            <>
              {/* Avatar and Name */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 sm:mb-10 text-center sm:text-left">
                <img
                  src={
                    admin.image ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(admin.name)
                  }
                  alt="Admin Avatar"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-yellow-500 object-cover transition duration-300 hover:scale-105"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {admin.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Welcome back, Admin 👋
                  </p>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-5">
                <InfoRow
                  icon={<Mail className="text-pink-500" />}
                  label="Email"
                  value={admin.email}
                />
                <InfoRow
                  icon={<UserCircle2 className="text-blue-500" />}
                  label="Username"
                  value={admin.name}
                />
                <InfoRow
                  icon={<Crown className="text-green-400" />}
                  label="Role"
                  value={admin.role}
                />
              </div>

              <div className="mt-10 text-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
            <div className="bg-[#0F172A] rounded-2xl border border-gray-800 p-6 sm:p-8 w-full max-w-lg relative shadow-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Edit Admin Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E293B] text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1E293B] text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white w-full sm:w-auto px-6 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-yellow-500 text-black w-full sm:w-auto px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 border border-gray-700 rounded-xl px-5 py-4 bg-[#1E293B] hover:border-yellow-500 hover:shadow-lg transition-all duration-200">
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white font-semibold text-base">{value}</p>
      </div>
    </div>
  );
}

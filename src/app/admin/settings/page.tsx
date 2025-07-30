"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import { ShieldCheck, Mail, UserCircle2, Crown, X } from "lucide-react";
import axios from "axios";

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

  const handleUpdate = async () => {
    if (!admin) return;
    setLoading(true);
    try {
      const { data } = await axios.put(
        `https://shopping-store-alpha-eight.vercel.app/api/v1/admin/user/${admin._id}`,
        {
          ...formData,
          role: admin.role,
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      setAdmin(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mt-12 px-6 md:px-10">
        <h1 className="text-4xl font-extrabold text-white mb-8 flex items-center gap-3 tracking-tight">
          <ShieldCheck className="w-8 h-8 text-yellow-400" />
          Admin Profile Settings
        </h1>

        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto relative">
          {!admin ? (
            <p className="text-gray-400 text-center">Loading admin info...</p>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <img
                  src={
                    admin.image ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(admin.name)
                  }
                  alt="Admin Avatar"
                  className="w-28 h-28 rounded-full border-4 border-yellow-500 shadow-lg object-cover transition duration-300 hover:scale-105"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold text-white">
                    {admin.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Welcome back, Admin 👋
                  </p>
                </div>
              </div>

              <div className="space-y-6">
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

              <div className="mt-12 text-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#0F172A] rounded-2xl border border-gray-800 p-8 w-full max-w-lg relative shadow-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">
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
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-yellow-500 text-black px-6 py-2 mt-4 rounded-lg font-semibold hover:bg-yellow-400 transition duration-200"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
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

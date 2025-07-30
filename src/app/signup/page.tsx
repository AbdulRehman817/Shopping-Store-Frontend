"use client"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("role", user.role);
      if (user.image) {
        formData.append("image", user.image);
      }

      const response = await fetch(
        "https://shopping-store-alpha-eight.vercel.app/api/v1/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("❌ Registration failed. Check your data.");
        throw new Error("Registration failed");
      }

      toast.success("✅ Registered successfully!");

      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form Fields */}
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <select
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        defaultValue="user"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setUser({ ...user, image: e.target.files?.[0] })}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
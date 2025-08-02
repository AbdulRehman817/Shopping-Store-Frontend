"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useAuth } from "../AuthContext/authcontext";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const { saveToken, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );

      const data: any = await res.json();

      if (!res.ok || !data.accessToken) {
        toast.error(data.message || "Login failed");
        console.error("Login error:", data.message || "Login failed");
        setLoading(false); // ← fix here
        return;
      }
      saveToken(data.accessToken, data.data); // ✅ pass both token and user object
      console.log("Login successful:", data);
      toast.success("Login successful!");
      fetchUser();
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/"); // replace with your user route
      }

      // No setLoading(false) here because we redirect right after
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Catch error:", err);
      setLoading(false); // ← also fix here
    }
  };

  return loading ? (
    <div className="flex justify-center mb-4">
      <Loader />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0F172A] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#FACC15] mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E11D48] hover:bg-pink-600 transition-colors duration-200 text-white py-2 rounded-lg font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#FACC15] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const LoginPage = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:3000/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }

//       if (!data.accessToken) {
//         setError("Access token missing in response");
//         return;
//       }

//       localStorage.setItem("token", data.accessToken);
//       localStorage.setItem("user", JSON.stringify(data.data));

//       router.push(role === "admin" ? "/admin/dashboard" : "/");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-[#0F172A] rounded-xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-[#FACC15] mb-6">
//           Welcome Back
//         </h2>

//         {error && (
//           <div className="bg-red-600 text-white text-sm p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1 text-gray-300">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1 text-gray-300">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="••••••••"
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1 text-gray-300">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#E11D48] hover:bg-pink-600 transition-colors duration-200 text-white py-2 rounded-lg font-semibold"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-400">
//           Don’t have an account?{" "}
//           <Link href="/signup" className="text-[#FACC15] hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

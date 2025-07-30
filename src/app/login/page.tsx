"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Logging in with:", { email, password, role });

    try {
      const res = await fetch(
        "https://shopping-store-alpha-eight.vercel.app/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );
      console.log("role", role);
      const data: any = await res.json();

      console.log("Response from server:", data);

      if (!res.ok) {
        setError(data.message || "Login failed");
        console.error("Login error:", data.message || "Login failed");
        return;
      }

      if (!data.accessToken) {
        setError("Token missing in response");
        console.error("Token missing in response:", data);
        return;
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));

      console.log("Token saved:", data.accessToken);
      console.log("User saved:", data.data);

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        console.log("Redirecting to /user/dashboard");
        router.push("/"); // replace with your user route
      }
    } catch (err) {
      setError("Something went wrong");
      console.error("Catch error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0F172A] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#FACC15] mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-600 text-white text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

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

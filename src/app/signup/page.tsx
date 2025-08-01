// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";

// interface SignupForm {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage = () => {
//   const router = useRouter();

//   const [form, setForm] = useState<SignupForm>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [error, setError] = useState("");

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, files } = e.target as HTMLInputElement;

//     if (name === "image" && files && files[0]) {
//       setImage(files[0]);
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("email", form.email);
//     formData.append("password", form.password);
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch(
//         "https://shopping-store-bqd2.vercel.app/api/v1/register",
//         {
//           method: "POST",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Signup failed");
//         return;
//       }

//       router.push("/");
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-[#0F172A] rounded-xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-[#FACC15] mb-6">
//           Create Your Account
//         </h2>

//         {error && (
//           <div className="bg-red-600 text-white text-sm p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           className="space-y-4"
//         >
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               placeholder="Your full name"
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               placeholder="your@email.com"
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               placeholder="Create a strong password"
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">
//               Profile Image
//             </label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#E11D48] hover:bg-pink-600 transition-colors duration-200 text-white py-2 rounded-lg font-semibold"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#FACC15] hover:underline">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/authcontext";
import { toast } from "react-toastify";
import { useState, FormEvent } from "react";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [user, setUser] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { storetokenInLocalStorage } = useAuth();

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if (image) formData.append("image", image);
    setError(null);

    try {
      const response = await fetch(
        `https://shopping-store-bqd2.vercel.app/api/v1/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      const res_data = await response.json();
      console.log("API Response:", res_data);

      if (response.ok && res_data.accessToken) {
        toast.success("Registration successful");
        storetokenInLocalStorage(res_data.accessToken);

        // ✅ Redirect to login after registration
        router.push("/");
      } else {
        setError(res_data.message || "Registration failed. Try again.");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Create an Account 🚀
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join us and start your journey today!
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm bg-red-100 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInput}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInput}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleInput}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

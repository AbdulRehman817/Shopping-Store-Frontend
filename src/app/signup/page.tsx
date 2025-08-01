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

const signup = () => {
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
        // `http://localhost:3000/api/v1/register`, // Use your local server URL for testing
        {
          method: "POST",

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

export default signup;

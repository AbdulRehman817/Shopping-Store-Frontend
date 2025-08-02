"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files[0]) {
      setImage(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/signup",
        {
          method: "POST",

          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.message || "Signup failed");
        console.log("error is coming", error);
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0F172A] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#FACC15] mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-600 text-white text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E11D48] hover:bg-pink-600 transition-colors duration-200 text-white py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-[#FACC15] hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

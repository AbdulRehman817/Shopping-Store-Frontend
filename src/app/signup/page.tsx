"use client";

import { useState } from "react";

import { motion } from "framer-motion"; // ✅ Correct import for framer-motion

import Link from "next/link";

import { useRouter } from "next/navigation";

const Signup = () => {

const router = useRouter();

// * User state to store form data

const [user, setUser] = useState({

name: "",

password: "",

email: "",

role:"",

image: null as File | null,

});



// * Message state for success or error alerts

const [message, setMessage] = useState("");

// TODO: Update form input values (text fields)

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

const { name, value } = e.target;

setUser((prev) => ({

...prev,

}));

};

// TODO: Handle image file upload and set to state

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

const file = e.target.files?.[0];

if (file) {

setUser((prev) => ({

...prev,  

image: file,

}));

}

};

const SubmitBtn = () => {

router.push("/"); // Redirect to login page after successful Signup`

};

// ! Handle form submission to backend API

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

e.preventDefault(); // ? Prevent page reload

try {

const formData = new FormData(); // * To send image/file along with other data

formData.append("name", user.name);

formData.append("email", user.email);

formData.append("password", user.password);

formData.append("role", user.role);

if (user.image) {

formData.append("image", user.image);

}

// * Send POST request to backend

const response = await fetch(

"https://shopping-store-alpha-eight.vercel.app/api/v1/register",  

{  

  method: "POST",  

  body: formData, // ! Don't manually set headers for FormData  

}

);

if (!response.ok) {

// ! Server responded with an error  

setMessage("❌ Registration failed. Check your data.");  

throw new Error("Registration failed");

}

const data = await response.json(); // * Convert response to JSON

setMessage("✅ Registered successfully!"); // ? Show success message

console.log("Registered:", data); // @note Debug log

} catch (error) {

console.error("Error:", error); // ! Catch and log any errors

setMessage("❌ Something went wrong. Try again.");

}

};

return (

<form onSubmit={handleSubmit} encType="multipart/form-data">  <motion.div

className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-6 py-16 text-white"  

initial={{ opacity: 0 }}  

animate={{ opacity: 1 }}  

transition={{ duration: 0.6 }}

> 

<div className="w-full max-w-5xl bg-[#1E293B] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#334155]">  

  {/* Left Panel for Branding */}  

  <div className="hidden md:flex flex-col justify-center items-center bg-[#0F172A] w-1/2 p-10">  

    <h2 className="text-3xl font-bold text-[#FACC15] mb-4">  

      Join Our Community  

    </h2>  

    <p className="text-gray-400 text-center">  

      Sign up to get access to exclusive offers, new arrivals, and more.  

    </p>  

  </div>  



  {/*  Right Panel with Form */}  

  <div className="w-full md:w-1/2 bg-[#1E293B] p-8 md:p-10">  

    <h3 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">  

      Create Your Account  

    </h3>  



    <div className="space-y-5">  

      {/* * Name Input */}  

      <div>  

        <label className="block text-sm font-medium text-gray-300 mb-1">  

          Name  

        </label>  

        <input  

          name="name"  

          value={user.name}  

          onChange={handleInput}  

          type="text"  

          placeholder="John Doe"  

          className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"  

        />  

      </div>  



      {/* * Email Input */}  

      <div>  

        <label className="block text-sm font-medium text-gray-300 mb-1">  

          Email  

        </label>  

        <input  

          name="email"  

          value={user.email}  

          onChange={handleInput}  

          type="email"  

          placeholder="you@example.com"  

          className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"  

        />  

      </div>  



      {/* * Password Input */}  

      <div>  

        <label className="block text-sm font-medium text-gray-300 mb-1">  

          Password  

        </label>  

        <input  

          name="password"  

          value={user.password}  

          onChange={handleInput}  

          type="password"  

          placeholder="••••••••"  

          className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"  

        />  

      </div>

   <div>
  <label className="block text-sm mb-1 text-gray-300">Role</label>
  <select
    value={user.role}
    onChange={(e) => setUser((prev) => ({ ...prev, role: e.target.value }))}
    className="w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>
      {/* * Image Upload */}  

      <div>  

        <label className="block text-sm font-medium text-gray-300 mb-1">  

          Profile Image  

        </label>  

        <label className="flex flex-col items-center justify-center w-full h-32 px-4 bg-[#0F172A] text-gray-400 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400">  

          <span>Click to upload image</span>  

          <input  

            type="file"  

            accept="image/*"  

            onChange={handleImageChange}  

            className="hidden"  

          />  

        </label>  

        {user.image && (  

          <p className="text-sm text-gray-400 mt-2">  

            Selected: {user.image.name}  

          </p>  

        )}  

      </div>  



      {/* * Submit Button */}  

      <button  

        onClick={SubmitBtn}  

        type="submit"  

        className="w-full bg-[#E11D48] hover:bg-pink-600 transition text-white py-2 rounded-lg font-semibold"  

      >  

        Sign Up  

      </button>  



      {/* ? Show success/error message */}  

      {message && (  

        <p className="text-center text-sm mt-4 text-yellow-400">  

          {message}  

        </p>  

      )}  

    </div>  



    {/* @note Redirect to login page */}  

    <p className="mt-6 text-sm text-center text-gray-400">  

      Already have an account?{" "}  

      <Link  

        href="/login"  

        className="text-[#FACC15] font-medium hover:underline"  

      >  

        Login  

      </Link>  

    </p>  

  </div>  

</div>

</motion.div>

</form>  );

};

export default Signup;
"use client"; // ! Next.js App Router mein router hook use karne ke liye zaroori hai

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./authcontext";

// TODO: Props ka type define kar rahe hain jo children accept karta hai
interface ProtectedRouteProps {
  children: ReactNode;
}

// * ProtectedRouteProvider component - sirf login users ko andar jane deta hai

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter(); // * Next.js ka router hook
  const { user } = useAuth(); // * AuthContext se user aur token le rahe hain
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ! Agar token nahi hai to login page pe redirect karo
  console.log(`User in ProtectedRouteProvider:`, user);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      router.push("/login"); // * Agar token nahi hai to login page pe redirect karo
    } else {
      setCheckingAuth(false);
      router.push("/"); // * Agar token hai to home page pe redirect karo
    }
  }, [token, router]); // * Dependency array mein token aur router ko add kiya
  if (!token || checkingAuth) {
    return null; // Or a loading spinner
  }

  // * Agar token hai to children render karo (yaani protected content)

  return <>{children}</>;
};

export default ProtectedRouteProvider;

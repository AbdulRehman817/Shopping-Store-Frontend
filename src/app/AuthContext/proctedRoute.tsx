"use client"; // ! Next.js App Router mein router hook use karne ke liye zaroori hai

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "./authcontext";

// TODO: Props ka type define kar rahe hain jo children accept karta hai
interface ProtectedRouteProps {
  children: ReactNode;
}

// * ProtectedRouteProvider component - sirf login users ko andar jane deta hai

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter(); // * Next.js ka router hook
  const { user, token } = useAuth(); // * AuthContext se user aur token le rahe hain

  // ! Agar token nahi hai to login page pe redirect karo

  if (!token) {
    router.push("/login"); // ? User ko Login page pe le jao
    return null; // * Jab tak redirect hota hai kuch bhi render mat karo
  }

  // * Agar token hai to children render karo (yaani protected content)

  return <>{children}</>;
};

export default ProtectedRouteProvider;

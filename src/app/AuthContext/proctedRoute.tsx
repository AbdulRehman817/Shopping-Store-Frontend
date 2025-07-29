"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  let checkingAuth = true;
  let token: string | null = null;
  let user: string | null = null;

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUserString = localStorage.getItem("user");

    token = localToken;
    user = localUserString;

    if (localToken && localUserString) {
      try {
        const parsedUser = JSON.parse(localUserString);
        if (parsedUser.role === "admin") {
          router.push("/admin/dashboard");
        } else if (parsedUser.role === "user") {
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error parsing user:", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }

    checkingAuth = false;
  }, [router]);

  if (checkingAuth) {
    return null; // You can show a spinner or loading screen here
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

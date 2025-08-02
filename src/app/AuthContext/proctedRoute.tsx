"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUserString = localStorage.getItem("user");

    if (!localToken || !localUserString) {
      router.push("/login");
      return;
    }

    try {
      const base64Payload = localToken.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      const expiry = decodedPayload.exp;

      const now = Math.floor(Date.now() / 1000);
      if (expiry && expiry < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      // ✅ Do NOT redirect based on role here
    } catch (err) {
      console.error("Auth error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ); // You can use a spinner here
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

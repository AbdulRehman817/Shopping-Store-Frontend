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

    if (localToken && localUserString) {
      try {
        // Decode JWT token to check expiration (base64 decoding)
        const base64Payload = localToken.split(".")[1]; // middle part of JWT
        const decodedPayload = JSON.parse(atob(base64Payload));
        const expiry = decodedPayload.exp;

        const now = Math.floor(Date.now() / 1000); // current time in seconds

        if (expiry && expiry < now) {
          // Token expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        const parsedUser = JSON.parse(localUserString);

        // Role-based routing
        if (parsedUser.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/"); // Redirect to home for regular users
        }
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null; // or a spinner
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function useRequireAdmin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role !== "admin") {
        router.push("/"); // Redirect non-admins to home
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/login");
    }
  }, []);
}

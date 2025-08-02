// src/components/AdminGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        const role = data?.data?.role || data.role;

        if (role === "admin") {
          setIsAdmin(true);
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (isAdmin === null) {
    return <div className="p-8 text-center">Checking admin access...</div>;
  }

  return <>{children}</>;
}

/*@typescript-eslint/no-explicit-any*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUserString = localStorage.getItem("user");

    setToken(localToken);
    setUser(localUserString);

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

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null; // You can show a spinner or loading screen here
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

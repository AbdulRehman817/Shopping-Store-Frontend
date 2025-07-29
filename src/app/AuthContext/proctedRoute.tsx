/*@typescript-eslint/no-explicit-any*/
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
    const localUser = localStorage.getItem("user");

    setToken(localToken);

    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);

      if (localToken && parsedUser.role === "admin") {
        router.push("/admin/dashboard");
      } else if (localToken && parsedUser.role === "user") {
        router.push("/");
      } else {
        router.push("/login");
      }
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null; // You can show a spinner or loading screen here
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

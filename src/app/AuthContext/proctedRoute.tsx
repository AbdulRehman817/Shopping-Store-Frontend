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
  //**This tells ESLint and TypeScript:
  const [_, setToken] = useState<string | null>(null);
  const [__, setUser] = useState<any>(null);

  // **Yes, I’m intentionally not using the first variable.”
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

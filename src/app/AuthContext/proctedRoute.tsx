/*@typescript-eslint/no-explicit-any*/

"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteProvider = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  //✅ No ESLint warning — useRef doesn't trigger re-renders and doesn’t complain when unused in JSX.
  const tokenRef = useRef<string | null>(null);
  const userRef = useRef<any>(null);

  useEffect(() => {
    tokenRef.current = localStorage.getItem("token");
    userRef.current = JSON.parse(localStorage.getItem("user") || "{}");

    if (tokenRef.current && userRef.current.role === "admin") {
      router.push("/admin/dashboard");
    } else if (tokenRef.current && userRef.current.role === "user") {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  if (checkingAuth) {
    return setCheckingAuth(false); // You can show a spinner or loading screen here
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

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

  useEffect(() => {
    // ✅ Only run this in the browser
    const localToken = localStorage.getItem("token");
    setToken(localToken);

    if (!localToken) {
      router.push("/login");
    } else {
      setCheckingAuth(false);
      router.push("/");
    }
  }, [router]);

  if (!token || checkingAuth) {
    return null; // Or return <LoadingSpinner />
  }

  return <>{children}</>;
};

export default ProtectedRouteProvider;

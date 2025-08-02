"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  image: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  saveToken: (token: string, user: User) => void;
  LogoutUser: () => void;
  storetokenInLocalStorage: (accessToken: string | null) => void;
  fetchUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const storetokenInLocalStorage = (accessToken: string | null) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const saveToken = (newToken: string, newUser: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    setToken(newToken);
    setUser(newUser);

    // 🔁 Redirect after saving token
    if (newUser.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  };

  const LogoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }

      setUser(data.data as User);
      console.log("User fetched:", data.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // 🌐 Parse JWT to check expiry
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (localToken && localUser) {
      const decoded = parseJwt(localToken);

      if (!decoded || decoded.exp * 1000 < Date.now()) {
        LogoutUser();
        return;
      }

      setToken(localToken);
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        saveToken,
        LogoutUser,
        storetokenInLocalStorage,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

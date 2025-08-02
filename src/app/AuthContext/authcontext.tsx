// "use client";
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { useRouter } from "next/navigation";

// interface User {
//   image: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   token: string | null;
//   user: User | null;
//   isLoggedIn: boolean;
//   saveToken: (token: string, user: User) => void;
//   LogoutUser: () => void;
//   storetokenInLocalStorage: (accessToken: string | null) => void;
//   fetchUser: () => void;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);

//   const storetokenInLocalStorage = (accessToken: string | null) => {
//     if (accessToken) {
//       localStorage.setItem("token", accessToken);
//       setToken(accessToken);
//     } else {
//       localStorage.removeItem("token");
//       setToken(null);
//     }
//   };

//   const saveToken = (newToken: string, newUser: User) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("token", newToken);
//       localStorage.setItem("user", JSON.stringify(newUser));
//     }
//     setToken(newToken);
//     setUser(newUser);

//     // 🔁 Redirect after saving token
//     if (newUser.role === "admin") {
//       router.push("/admin/dashboard");
//     } else {
//       router.push("/");
//     }
//   };

//   const LogoutUser = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }
//     setToken(null);
//     setUser(null);
//     router.push("/login");
//   };

//   const fetchUser = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(
//         "https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || "Failed to fetch user");
//       }

//       setUser(data.data as User);
//       console.log("User fetched:", data.data);
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//     }
//   };

//   // 🌐 Parse JWT to check expiry
//   const parseJwt = (token: string) => {
//     try {
//       return JSON.parse(atob(token.split(".")[1]));
//     } catch {
//       return null;
//     }
//   };

//   useEffect(() => {
//     const localToken = localStorage.getItem("token");
//     const localUser = localStorage.getItem("user");

//     if (localToken && localUser) {
//       const decoded = parseJwt(localToken);

//       if (!decoded || decoded.exp * 1000 < Date.now()) {
//         LogoutUser();
//         return;
//       }

//       setToken(localToken);
//       setUser(JSON.parse(localUser));
//     }
//   }, []);

//   useEffect(() => {
//     if (token && !user) {
//       fetchUser();
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         isLoggedIn: !!token,
//         saveToken,
//         LogoutUser,
//         storetokenInLocalStorage,
//         fetchUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return context;
// };
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
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
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  saveToken: (token: string, userData: User) => void;
  LogoutUser: () => void;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  // ✅ Safe JWT decoder
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) throw new Error("Invalid token");

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("JWT parse error:", err);
      return null;
    }
  };

  // ✅ Save user and token
  const saveToken = (newToken: string, userData: any) => {
    const decoded = parseJwt(newToken);

    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
      console.log("Invalid or expired token.");
      LogoutUser();
      return;
    }

    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout handler
  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // ✅ Check token on first load
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (localToken && localUser) {
      const decoded = parseJwt(localToken);

      if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
        console.log("Token expired or invalid");
        LogoutUser();
      } else {
        setToken(localToken);
        setUser(JSON.parse(localUser));
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, token, saveToken, fetchUser, LogoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

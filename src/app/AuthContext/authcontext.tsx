"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// TODO: Yeh interface user ka type define karta hai
interface User {
  image: string;
  name: string;
  email: string;
  // TODO: Agar aur fields hain to yahan add karo
}

// TODO: Yeh interface AuthContext ka type define karta hai
interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  saveToken: (token: string) => void;
  LogoutUser: () => void;
  storetokenInLocalStorage: (accessToken: string | null) => void; // ✅ Add this line
}

// TODO: Provider ke children ka type define kiya
interface AuthProviderProps {
  children: ReactNode;
}

// * Context create kiya jisme default value null hai
const AuthContext = createContext<AuthContextType | null>(null);

// * AuthProvider component jise app ke around wrap karte hain
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // ! RED: localStorage ko direct use nahi kar sakte kyunki server-side pe run hota hai
  const [token, setToken] = useState<string | null>(null);

  // * User ka data store karne ke liye state
  // ! RED: Pehle yahan type 'object' use kiya tha jo galat tha
  const [user, setUser] = useState<User | null>(null);

  //

  const storetokenInLocalStorage = (accessToken: any) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  // ? Jab login hota hai to token save karte hain
  const saveToken = (newToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken); // token ko localStorage mein save kiya
    }
    setToken(newToken); // token ko state mein bhi update kiya
  };

  // ? Logout karne par token aur user dono clear kar dete hain
  const LogoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // token ko localStorage se hata diya
    }
    setToken(null); // state se bhi hata diya
    setUser(null); // user data bhi clear kar diya
  };

  // * User ka data backend se fetch karo
  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/v1/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json(); //*this line parses the JSON response
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }
      setUser(data.data as User); //* ye line jo asal object usko overwrite kardeata hai 
                                  //* yani agar pehle user object mei name or email tha phir 
                                  //* mene ye line of code likha to wo user ko overwrite karke
                                  //* name,email or image add kardega
      console.log("User fetched:", data.data); // *and now i can access user properties like user.data.name
    } catch (error) {
      console.error("Failed to fetch user:", error); // ! agar error aaye to console mein dikhaya
    }
  };

  // * Jab component mount ho to localStorage se token uthao
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    }
  }, []);

  // * Jab token change ho to user data dobara fetch karo
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  // * Auth context values ko return karo
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        saveToken,
        LogoutUser,
        storetokenInLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// * useAuth custom hook jisse context access kar sakein
export const useAuth = () => {
  const context = useContext(AuthContext);

  // ! Error agar provider ke bahar use ho raha ho
  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context;
};

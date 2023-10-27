import React, { useEffect, useState, useContext } from "react";
import { onAuthStateChanged, getAuth, User, Auth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth: Auth = getAuth(firebase_app);

type AuthContextType = {
  user: User | null;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType | undefined => useContext(AuthContext);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

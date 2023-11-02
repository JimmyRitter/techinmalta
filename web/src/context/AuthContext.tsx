"use client";
import React, { useEffect, useState } from "react";
import {
    onAuthStateChanged,
    getAuth,
    User,
    Auth,
    updateProfile,
} from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth: Auth = getAuth(firebase_app);

type AuthContextType = {
    user: User | null;
};

type FirebaseUserProfile = {
    displayName: string;
    photoUrl: string;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
    undefined
);

export const useAuthContext = (): AuthContextType | undefined =>
    React.useContext(AuthContext);

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        debugger;
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            if (user && !localStorage.getItem("token")) {
                const token = await user.getIdToken(true);
                localStorage.setItem("token", token || "");
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <></> : children}
        </AuthContext.Provider>
    );
};

export const updateUserProfile = (user: User, profile: FirebaseUserProfile) => {
    return updateProfile(user, profile);
};

"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signOut from "@/firebase/signout";
function Page() {
    const { user }: any = useAuthContext();
    const router = useRouter();

    React.useEffect(() => {
        if (user == null) router.push("/");
    }, [user]);

    const handleLogout = async () => {
        const { error } = await signOut();

        if (error) {
            return console.error(error);
        }

        return router.push("/");
    };

    return (
        <>
            <h1>This is your profile page!</h1>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default Page;

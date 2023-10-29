"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signOut from "@/firebase/signout";
import Image from "next/image";

function Page() {
    const { user }: any = useAuthContext();
    const router = useRouter();
    const [avatar, setAvatar] = React.useState("");

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
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <Image
                        src={user?.profileUrl || "https://api.dicebear.com/7.x/fun-emoji/jpg?seed=jimmy&size=256"}
                        width={500}
                        height={500}
                        alt="Profile Picture"
                    />
                    <p className="mt-2 text-gray-600">Display Name: {user.displayName}</p>
                    {/* <input
                    type="text"
                    className="mt-4 w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400"
                /> */}
                    <p className="mt-2 text-gray-600">Email: {user.email}</p>
                </div>
            </div>
        </>
    );
}

export default Page;

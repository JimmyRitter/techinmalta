"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Page() {
    const { user }: any = useAuthContext();
    const router = useRouter();
    const [avatar, setAvatar] = React.useState("");

    React.useEffect(() => {
        if (!user) {
            router.push("/");
            return;
        }

        const fetchData = async () => {
            try {
                const { currentUser } = user.auth;
                const token = currentUser && (await currentUser.getIdToken());

                const payloadHeader = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await fetch("http://localhost:3001", payloadHeader);
                console.log(await res.text());
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [user]);

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
                    <p className="mt-2 text-gray-600">Display Name: {user?.displayName}</p>
                    <input
                        type="text"
                        className="mt-4 w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400"
                    /> *
                    <p className="mt-2 text-gray-600">Email: {user?.email}</p>
                </div>
            </div>
        </>
    );
}

export default Page;

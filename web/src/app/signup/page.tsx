"use client";
import React, { useState } from "react";
// import signUp from "@/firebase/auth/signup";
import signUp from "@/firebase/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleForm = async (event: any) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        switch (error?.code) {
            case "auth/email-already-in-use":
                setError("Email is already in use.");
                break;
            case "auth/email-already-in-use":
                setError("Email is already in use.");
                break;
            default:
                break;
        }

        return router.push("/profile");
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Sign up
                </h1>
                <form onSubmit={handleForm} className="space-y-4">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Sign up
                    </button>
                </form>

                {/* Horizontal Line */}
                <hr className="my-4 border-t border-gray-200" />

                {/* Sign Up Link */}
                <div className="text-center">
                    <Link href="/signin">
                        <span className="text-blue-500 hover:underline">
                            Already have an account? Click here to Sign In
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;

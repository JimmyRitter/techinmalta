"use client";
import React from "react";
import signIn from "@/firebase/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.error(error);
    }

    return router.push("/profile");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-700 font-medium">
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
            Sign in
          </button>
        </form>

        {/* Horizontal Line */}
        <hr className="my-4 border-t border-gray-200" />

        {/* Sign Up Link */}
        <div className="text-center">
          <Link href="/signup">
            <span className="text-blue-500 hover:underline">
              Don't have an account? Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;

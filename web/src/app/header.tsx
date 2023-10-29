"use client";
import Link from "next/link"; 
import { useAuthContext } from "@/context/AuthContext";
import signOut from "@/firebase/signout";

interface HeaderProps {
    // Define your component's props and their types here, if needed.
}

const Header: React.FC<HeaderProps> = () => {
    const { user }: any = useAuthContext();

    const handleLogout = async () => {
        const { error } = await signOut();

        if (error) {
            return console.error(error);
        }
    };

    return (
        <nav className="px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link href="/">
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                        Home
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {/* <ThemeToggler /> */}
                    {user && (
                        <>
                            <button
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover-bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>

                            <Link href="/profile">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.photoURL}
                                    alt=""
                                />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;

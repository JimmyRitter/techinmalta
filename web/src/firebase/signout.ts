import { FirebaseError } from "firebase/app";
import { Auth, User, signOut as FirebaseSignOut, getAuth } from "firebase/auth";
import firebase_app from "./config";

const auth: Auth = getAuth(firebase_app);

type SignOutResult = {
    error: FirebaseError | null;
};

export default async function signOut(): Promise<SignOutResult> {
    let error: FirebaseError | null = null;

    try {
        await FirebaseSignOut(auth);
    } catch (e: any) {
        error = e;
    }

    return { error };
}

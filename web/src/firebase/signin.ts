import { FirebaseError } from "firebase/app";
import {
    Auth,
    UserCredential,
    signInWithEmailAndPassword,
    getAuth,
} from "firebase/auth";
import firebase_app from "./config";

const auth: Auth = getAuth(firebase_app);

type SignInResult = {
    result: UserCredential | null;
    error: FirebaseError | null;
};

export default async function signIn(
    email: string,
    password: string
): Promise<SignInResult> {
    let result: UserCredential | null = null;
    let error: FirebaseError | null = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
        error = e;
    }

    return { result, error };
}

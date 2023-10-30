import { FirebaseError } from "firebase/app";
import firebase_app from "./config";
import {
    Auth,
    getAuth,
    sendPasswordResetEmail,
} from "firebase/auth";

const auth: Auth = getAuth(firebase_app);

type ForgotPasswordResult = {
    error: FirebaseError | null;
};

export default async function forgotPassword(
    email: string,
): Promise<ForgotPasswordResult> {
    let error: FirebaseError | null = null;
debugger;
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e: any) {
        error = e;
    }

    return { error };
}

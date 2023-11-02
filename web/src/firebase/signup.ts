import { FirebaseError } from "firebase/app";
import firebase_app from "./config";
import {
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
} from "firebase/auth";

const auth: Auth = getAuth(firebase_app);

type SignUpResult = {
    result: UserCredential | null;
    error: FirebaseError | null;
};

export default async function signUp(
    email: string,
    password: string
): Promise<SignUpResult> {
    let result: UserCredential | null = null;
    let error: FirebaseError | null = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = result;
        const token = user && (await user.getIdToken(true));
        localStorage.setItem("token", token || "");
    } catch (e: any) {
        error = e;
    }

    return { result, error };
}

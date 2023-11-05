import { doc, getDoc, getFirestore } from "firebase/firestore";
import { User } from "firebase/auth";
import { UserProfile } from "@/app/profile/profile.types";

export const getUserProfile = async (user: User): Promise<UserProfile | undefined> => {
  const db = getFirestore();

  const docRef = doc(db, "users", user.email!);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
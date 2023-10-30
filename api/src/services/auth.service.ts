import { Request, Response, NextFunction } from "express";
import {
    signInWithEmailAndPassword,
} from "firebase/auth";

// const auth: Auth = getAuth(firebase_app);


export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.send("LOGIN");

//   signInWithEmailAndPassword(auth, email, password);
};

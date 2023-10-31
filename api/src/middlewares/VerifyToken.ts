import { DecodedIdToken } from "firebase-admin/auth";
import auth from "../firebase/config";
import { Request, Response, NextFunction } from "express";

export const VerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization?.split(" ")[1] || "";

  if (!token) return res.status(498).json({ message: "No token provided" });

  try {
    const decodeValue: DecodedIdToken = await auth.verifyIdToken(token);
    if (decodeValue) {
      // token is valid, continue the request
      (req as any).userUid = decodeValue.uid;
      return next();
    }
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};

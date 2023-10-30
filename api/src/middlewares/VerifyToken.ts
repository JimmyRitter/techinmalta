import { DecodedIdToken } from "firebase-admin/auth";
import auth from "../firebase/config";
import { Request, Response, NextFunction } from "express";

export const VerifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req?.headers?.authorization?.split(" ")[1] || "";

    try {
        const decodeValue: DecodedIdToken = await auth.verifyIdToken(token);
        if (decodeValue) {
            console.log(decodeValue);
            return next();
        }
    } catch (e) {
        return res.json({ message: "Internal Error" });
    }
};
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const user = await admin.auth().getUser((req as any).userUid);

  const result = await admin.auth().getUser(user.uid);
  res.send(result);
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);

  const user = await admin.auth().getUser((req as any).userUid);

  await admin.auth().updateUser(user.uid, req.body);
  console.log("User profile updated successfully");
  res.send("User profile updated successfully");
};

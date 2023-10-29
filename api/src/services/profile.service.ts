import { Request, Response, NextFunction } from "express";

export const getUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.send("did it! :)");
};

export const updateUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.send("PUT - Update User Profile");
};

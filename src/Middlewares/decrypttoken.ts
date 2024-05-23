import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.TBD_KEY;

export const decodeReversedJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Changed Promise<Response> to void
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Ensure that no further processing happens
  }

  try {
    const reversedToken = token.split("").reverse().join(""); // Reverse the token back
    const decoded = jwt.verify(reversedToken, SECRET_KEY) as {
      user_id: string;
    };

    req.user_id = decoded.user_id; // Assuming you extend the Request interface to include user_id
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

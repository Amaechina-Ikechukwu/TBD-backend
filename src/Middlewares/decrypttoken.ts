import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import BusinessInitialization from "../Services/Business/BusinessInitialization";

const SECRET_KEY = process.env.TBD_KEY;

export const decodeReversedJwt = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Changed Promise<Response> to void
  const token = req.headers.authorization?.split(" ")[1];
  const businessMethods = new BusinessInitialization();
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Ensure that no further processing happens
  }

  try {
    const reversedToken = token.split("").reverse().join(""); // Reverse the token back
    const { data } = jwt.verify(reversedToken, SECRET_KEY) as {
      data: { uid: string };
    };
    const existResponse = await businessMethods.doesBusinessIDExist(data.uid);
    if (!existResponse) {
      res.status(401).json({ message: "No token provided" });
      return; // Ensure that no further processing happens
    }
    req.user_id = data.uid; // Assuming you extend the Request interface to include user_id
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).json({ message: "Unauthorized" });
  }
};

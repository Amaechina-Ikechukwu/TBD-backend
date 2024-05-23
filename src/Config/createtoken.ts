import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
  return token.split("").reverse().join(""); // Reverse the token
};

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.TBD_KEY;

export const generateToken = (data: any): string => {
  const token = jwt.sign({ data }, SECRET_KEY, { expiresIn: "14d" });
  return token.split("").reverse().join(""); // Reverse the token
};

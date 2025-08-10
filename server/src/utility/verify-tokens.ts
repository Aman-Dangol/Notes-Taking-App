import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY || "") as JwtPayload;
    return data.id;
  } catch {
    return "";
  }
};

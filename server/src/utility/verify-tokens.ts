import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Verifies a JWT token and returns the user ID if valid.
 * @param {string} token - The JWT token to verify.
 * @returns {string} The user ID if the token is valid, otherwise an empty string.
 */
export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY || "") as JwtPayload;
    return data.id;
  } catch {
    return "";
  }
};

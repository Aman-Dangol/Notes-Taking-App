import jwt, { SignOptions } from "jsonwebtoken";

interface tokenGenerationProps {
  /**
   * expiresIn: how long should the token be valid for
   * @type {string | number}
   * @example "1hr", "30m", 3600
   * @default  "1h"
   */
  expiresIn?: SignOptions["expiresIn"];
  /**
   * data from which to generate then token
   * @type {object}
   * @example {id:123}
   * @default  {}   */
  payload: object;
}

/**
 * Generates a JWT token with the provided payload and expiration time.
 * @param {tokenGenerationProps} options - Options for token generation.
 * @returns {string} The generated JWT token.
 */
export const generateToken = ({
  expiresIn = "1h",
  payload,
}: tokenGenerationProps) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY || "", {
    expiresIn,
  });

  return token;
};

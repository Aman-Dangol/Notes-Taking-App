import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 * @param {string} data - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashFn = async (data: string) => {
  const hash = await bcrypt.hash(data, saltRounds);

  return hash;
};

/**
 * Compares a plaintext password with a hashed password.
 * @param {string} data - The plaintext password.
 * @param {string} dbData - The hashed password from the database.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
const compare = async (data: string, dbData: string) => {
  const match = await bcrypt.compare(data, dbData);

  return match;
};

export { hashFn, compare };

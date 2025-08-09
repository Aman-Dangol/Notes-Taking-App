import bcrypt from "bcrypt";
const saltRounds = 10;
const hashFn = async (data: string) => {
  const hash = await bcrypt.hash(data, saltRounds);

  return hash;
};

const compare = async (data: string, dbData: string) => {
  const match = await bcrypt.compare(data, dbData);

  return match;
};

export { hashFn, compare };

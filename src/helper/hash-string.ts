import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashString = (str: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    hash(str, SALT_ROUNDS, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export const checkHash = (
  hash: string,
  strToCompare: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    compare(strToCompare, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

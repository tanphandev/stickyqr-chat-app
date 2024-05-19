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
  console.log(`Hash: ${hash}`);
  console.log(`String to compare: ${strToCompare}`);
  return new Promise((resolve, reject) => {
    compare(strToCompare, hash, function (err, result) {
      if (err) {
        console.log(`Error during comparison: ${err}`);
        reject(err);
      }
      console.log(`Comparison result: ${result}`);
      resolve(result);
    });
  });
};

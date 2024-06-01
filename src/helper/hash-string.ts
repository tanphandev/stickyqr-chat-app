import { hash, verify } from 'argon2';

export const hashString = async (str: string): Promise<string> => {
  return await hash(str);
};

export const checkHash = (
  hash: string,
  strToCompare: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    verify(hash, strToCompare)
      .then((result) => {
        if (result === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => reject(error));
  });
};

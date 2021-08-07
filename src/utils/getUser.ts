import { PrismaClient, User } from "@prisma/client";
import { verifyIdToken } from "../firebase";
import userService from "../user/user.service";

const getUser = async (token: string, db: PrismaClient): Promise<User> => {
  if (!token) return null;
  try {
    const decodedToken = await verifyIdToken(token);
    return await userService.findByEmail(decodedToken?.email, db);
  } catch (err) {
    console.error(`error while trying to get user with token ${token}`);
    throw err;
  }
};

export default getUser;

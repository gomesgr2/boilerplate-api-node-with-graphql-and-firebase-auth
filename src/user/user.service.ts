import { PrismaClient, User } from "@prisma/client";
import { InputUser } from "../graphql";

const find = async (id: string, db: PrismaClient): Promise<User> => {
  return await db.user.findUnique({ where: { id } });
};

const findByEmail = async (email: string, db: PrismaClient): Promise<User> => {
  return await db.user.findUnique({ where: { email } });
};

const create = async (user: InputUser, db: PrismaClient): Promise<User> => {
  return await db.user.create({
    data: { name: user.name, email: user.email, age: user.age },
  });
};

const userService = {
  find,
  create,
  findByEmail
};

export default userService;

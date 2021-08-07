import { Context } from "../../context";
import { QueryUserArgs, User } from "../../graphql";
import userService from "../user.service";

const user = async (
  _: undefined,
  { id }: QueryUserArgs,
  { db }: Context
): Promise<User> => {
  try {
    return await userService.find(id, db);
  } catch (err) {
    console.error(`error while trying get user with id ${id}`);
    throw new Error(err.message);
  }
};

export default user;

import { Context } from "../../context";
import firebase from "../../firebase";
import { MutationCreateUserArgs, User } from "../../graphql";
import userService from "../user.service";

const createUser = async (
  _: undefined,
  { user }: MutationCreateUserArgs,
  { db }: Context
): Promise<User> => {
  try {
    await firebase.createFirebaseUser(user);
    return await userService.create(user, db);
  } catch (err) {
    console.error(`error while create user with email ${user.email}`);
    throw new Error(err.message);
  }
};

export default createUser;

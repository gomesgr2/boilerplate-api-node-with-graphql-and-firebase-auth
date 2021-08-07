import { IResolvers } from "graphql-tools";
import user from "./query/user";
import createUser from "./mutation/createUser";

const userResolvers: IResolvers = {
  Query: {
    user,
  },

  Mutation: {
    createUser,
  },
};

export default userResolvers;

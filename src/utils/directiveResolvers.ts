import { NextResolverFn } from "apollo-server-core/node_modules/graphql-tools";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { Context } from "../context";

const directiveResolvers = {
  isAuthenticated: async (
    next: NextResolverFn,
    source: undefined,
    args: undefined,
    context: Context
  ) => {
    if (!context.user) throw new AuthenticationError("You must be logged in");
    return next();
  },
  isAdmin: async (
    next: NextResolverFn,
    source: undefined,
    args: undefined,
    context: Context
  ) => {
    if (context.user?.role !== "ADMIN")
      throw new ForbiddenError("Permission Denied");
    return next();
  },
};

export default directiveResolvers;

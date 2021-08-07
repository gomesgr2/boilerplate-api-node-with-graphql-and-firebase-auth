require("dotenv/config");
import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import path from "path";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { PrismaClient } from "@prisma/client";
import getUser from "./utils/getUser";
import directiveResolvers from "./utils/directiveResolvers";

const db = new PrismaClient();

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./**/*.graphql"))
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./**/*.resolver.*"))
);

const context = async ({ req }) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const user = await getUser(token, db);
  return { db, user };
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
});

const server = new ApolloServer({
  schema,
  context,
});

const app = express();
const PORT = process.env.PORT || 3000;

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/graphql`);
});

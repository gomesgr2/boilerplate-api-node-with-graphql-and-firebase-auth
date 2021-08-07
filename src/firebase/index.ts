import admin, { auth } from "firebase-admin";
import { InputUser } from "../graphql";
import config from "./config";

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const createFirebaseUser = async (
  user: InputUser
): Promise<auth.UserRecord | null> => {
  try {
    return admin.auth().createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    });
  } catch (err) {
    throw new Error(
      `Error when trying to create user in firebase with email ${user.email}`
    );
  }
};

export const verifyIdToken = async (
  token: string
): Promise<auth.DecodedIdToken | null> => {
  try {
    return admin.auth().verifyIdToken(token);
  } catch (err) {
    console.error(
      `Error when trying to verify user in firebase with token ${token}`
    );
  }
};

const firebase = { createFirebaseUser, verifyIdToken };

export default firebase;

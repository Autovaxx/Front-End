import { firebaseConfig } from "./firebase-config";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "@firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import * as dbModels from "./database-models";

const myApp = initializeApp(firebaseConfig);
const db = getFirestore(myApp);

export const updateUserDoc = async (userCred, data) => {
  await setDoc(doc(db, "users", userCred), data, { merge: true });
};

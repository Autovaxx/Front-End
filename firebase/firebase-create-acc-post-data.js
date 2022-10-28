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

export const createUserCollection = async (userCred, emailAddress) => {
  await setDoc(doc(db, "users", userCred), {
    email: emailAddress,
    address: dbModels.address,
    appointment: dbModels.appointment,
    "emergency contact": dbModels.emergency_contact,
    "previous vaccines": dbModels.previous_vaccine,
    user_profile: dbModels.user_profile,
    required_steps: dbModels.required_steps,
    search_preferences: dbModels.search_preference,
  });
};

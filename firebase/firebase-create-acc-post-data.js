import { firebaseConfig } from "./firebase-config"
import { getFirestore, collection, setDoc, doc } from "@firebase/firestore/lite"
import { initializeApp } from 'firebase/app';

const myApp = initializeApp(firebaseConfig);
const db = getFirestore(myApp)

export const createUserCollection = async (userCred, emailAddress) => {

    await setDoc(doc(db, 'users', userCred), {
        email: emailAddress
    })
}

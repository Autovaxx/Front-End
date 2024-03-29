import { firebaseConfig } from "./firebase-config"
import { getFirestore, collection, getDoc, doc } from "@firebase/firestore/lite"
import { initializeApp } from 'firebase/app';

const myApp = initializeApp(firebaseConfig);
const db = getFirestore(myApp)

export const getUserDocument = async (userCred) =>{
    
     try{
        const userData = await getDoc(doc(db, 'users', userCred))

        let userDataJSON = JSON.stringify(userData.data(), null, 4)

        console.log(`User doc data: ${userDataJSON}`)
        
        return userDataJSON

     }catch (error) {
        console.log(`Error fetching document:\n ${error}`)
     }
}

firebaseConfig.auth

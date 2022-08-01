import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpIEgcUoi1owPTl1QW3lSktswM0Fhje7M",
    authDomain: "whatsapp-2-bd206.firebaseapp.com",
    projectId: "whatsapp-2-bd206",
    storageBucket: "whatsapp-2-bd206.appspot.com",
    messagingSenderId: "361086244133",
    appId: "1:361086244133:web:e312901d810cb08c3ef6cc",
    measurementId: "G-30JR0M5DE8"
  };
  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider;
  
  export { db, auth, provider };
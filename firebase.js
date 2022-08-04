import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCL7nuq9Kxbp5kaI1LV4jpIMTIm5saxHOM",
    authDomain: "whatsapp-8d0c1.firebaseapp.com",
    projectId: "whatsapp-8d0c1",
    storageBucket: "whatsapp-8d0c1.appspot.com",
    messagingSenderId: "1024096747485",
    appId: "1:1024096747485:web:fc936942d419e2de234034",
    measurementId: "G-KD2PKEWEVK"
  };
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
 
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider;
  
  export { db, auth, provider };
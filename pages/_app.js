import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import Login from "./login"
import Loading from "../components/Loading"
import firebase from "../firebase"
import { useEffect } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
function MyApp({ Component, pageProps }) {
  // Check login 
    const [user, loading] = useAuthState(auth)
    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid)
            setDoc(userRef, {
                email: user.email,
                lastSeen: serverTimestamp(),
                photoURL: user.photoURL
            }, { merge: true })
        }
    }, [user])
    if (loading) return <Loading />

    if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp

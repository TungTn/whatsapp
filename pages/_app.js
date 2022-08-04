import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import Login from "./login"
import Loading from "../components/Loading"
import { useEffect } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
function MyApp({ Component, pageProps }) {
  // Check login 
    const [user, loading] = useAuthState(auth)
    useEffect(() => {
        const setUserInDb = async () => {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    email: user?.email,
                    lastSeen: serverTimestamp(),
                    photoURL: user?.photoURL
                }, { merge: true })
            } catch (error) {
                
            }              
        }
        if (user) {   
            setUserInDb()         
        }
    }, [user])
    if (loading) return <Loading />

    if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp

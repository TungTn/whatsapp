import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

function Login() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const signIn = () => {
      signInWithGoogle()
  }
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>
        <LoginContainer>
            <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
            <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
        </LoginContainer>
    </Container> 
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 100px;
  border-radius: 5px; 
`

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`
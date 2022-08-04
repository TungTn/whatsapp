import React from 'react'
import styled from 'styled-components'
import { Avatar }  from '@material-ui/core'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase"
import { collection, query, where } from 'firebase/firestore'


function Chat({id, users}) {
  const [user] = useAuthState(auth)

  // get recipent Avatar 
  const q = query(collection(db, 'users'), where('email', '==', getRecipientEmail(users, user)))  
  const [recipientSnapshot] =  useCollection(q)
  const recipent = recipientSnapshot?.docs?.[0]?.data()
  console.log(recipientSnapshot)

  // get recipent Email
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <Container>
        {
          recipent ? (
            <UserAvatar src={recipent.photoURL}/>
          ) : (
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
          )
        }
        <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: bread-word;
  :hover {
    background-color: whitesmoke;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
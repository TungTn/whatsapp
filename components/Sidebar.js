import React from 'react'
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { doc, setDoc, collection, query, where } from 'firebase/firestore'
import Chat from "../components/Chat"
function Sidebar() {
    const [user] = useAuthState(auth)
    const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email))
    const [chatsSnapshot] =  useCollection(userChatRef)

    const createChat = () => {        
        const input = prompt('Please enter email to create new chat')
 
        if (!input) return null
        
        if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
            // we need to add the chat into the db 'chats' collection if it doesnt already exist and is valid
            const userRef = doc(db, "chats", user.uid)
            setDoc(userRef, {
                users: [input, user.email]
            })
        }
    }
    const chatAlreadyExist = (recipientEmail) => 
            !!chatsSnapshot?.docs?.find((chat) => chat.data().users.find(user => user === recipientEmail)?.length > 0)
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>                
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats"/>
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

            {/* List Of Chat */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
                
            
        </Container>
    )
}

export default Sidebar

const Container = styled.div``;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
        transition: all ease .5s
    }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display: flex; 
    align-items: center; 
    padding: 20px;
    border-radius: 5px;
`;

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }    
`;
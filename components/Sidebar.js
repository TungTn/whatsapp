import { React, useState } from 'react'
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { doc, addDoc, collection, query, where } from 'firebase/firestore'
import Chat from "../components/Chat"
const Sidebar = () => {
    const [user] = useAuthState(auth)

    const [isOpenNewConversationDialog, setisOpenNewConverstationDialog] = useState(false)

    const [recipientEmail, setRecipientEmail] = useState('')

    const toggleNewConversationDialog = (isOpen) => {
		setisOpenNewConverstationDialog(isOpen)

		if (!isOpen) setRecipientEmail('')
	}

    const closeNewConversationDialog = () => {
        toggleNewConversationDialog(false)
    }

    const userChatRef = query(
		collection(db, 'chats'),
		where('users', 'array-contains', user?.email)
    )

    const [chatsSnapshot] =  useCollection(userChatRef)

    const chatAlreadyExist = (recipientEmail) => 
            chatsSnapshot?.docs.find((chat) => chat?.data().users.includes(recipientEmail))

    const isInvitingSelf = recipientEmail === user.email

    const createChat = async () => {        
        if (!recipientEmail) return
         
        if (EmailValidator.validate(recipientEmail) && !chatAlreadyExist(recipientEmail) && !isInvitingSelf) {
            // we need to add the chat into the db 'chats' collection if it doesnt already exist and is valid
            await addDoc(collection(db, 'chats'), {
				users: [user?.email, recipientEmail]
			})
        }
        closeNewConversationDialog()
    }    
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

            <SidebarButton onClick={() => {
					toggleNewConversationDialog(true)
				}}>
                Start a new chat
            </SidebarButton>

            <Dialog open={isOpenNewConversationDialog}
				onClose={closeNewConversationDialog}
            >
                <DialogTitle>New converstation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please enter a Google email address for the user you wish to chat with
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={recipientEmail}
                        onChange={event => {
                            setRecipientEmail(event.target.value)
                        }}
                    ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNewConversationDialog}>Cancle</Button>
                    <Button disabled={!recipientEmail} onClick={createChat}>Create Converstation</Button>
                </DialogActions>
            </Dialog>

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
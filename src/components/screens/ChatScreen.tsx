import { FC } from "react"
import { Box } from "@mui/material"
import ChatInput from "../chat/ChatInput"
import ChatWindow from "../chat/ChatWindow"

const ChatScreen: FC = () => {
    return (
        <Box sx={{ height: 536, display: "flex", flexDirection: "column-reverse" }}>
            <ChatInput />
            <ChatWindow />
        </Box>
    )
}

export default ChatScreen

import { FC } from "react"
import { Box } from "@mui/material"
import ChatInput from "./ChatInput"
import ChatWindow from "./ChatWindow"

const ChatScreen: FC = () => {
    return (
        <Box sx={{ height: 536, display: "flex", flexDirection: "column-reverse" }}>
            <ChatInput />
            <ChatWindow />
        </Box>
    )
}

export default ChatScreen

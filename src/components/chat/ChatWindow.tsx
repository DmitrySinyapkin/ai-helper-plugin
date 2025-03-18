import { FC, useEffect, useRef } from "react"
import { Box, CircularProgress } from "@mui/material"
import ChatMessage from "./ChatMessage"
import useChatStore from "../../store/chat"
import { blue  } from "@mui/material/colors"

const ChatWindow: FC = () => {
    const { messages, pending } = useChatStore()

    const windowRef = useRef<Element>(null)

    const scrollBottom = () => {
        windowRef.current!.scrollTop = windowRef.current!.scrollHeight
    }

    useEffect(() => {
        scrollBottom()
    }, [])

    return (
        <Box 
            ref={windowRef}
            sx={{ p: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', bgcolor: blue[50] }}
            component={'div'}
        >
            {messages.map((message: Message, index: number) => <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                url={message.url}
            />)}
            {pending && <CircularProgress sx={{ m: 1 }} />}
        </Box>
    )
}

export default ChatWindow

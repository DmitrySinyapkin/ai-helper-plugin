import { FC } from "react"
import { Box, TextField, IconButton, FormControlLabel, Switch } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import useChatStore from "../../store/chat"

const ChatInput: FC = () => {
    const { sendMessage } = useChatStore()

    const handleSubmit = (formData: FormData) => {
        const message = formData.get('message')
        const addition = formData.get('addition')
        
        if (message) {
            if (addition) {
                sendMessage(message as string)
            } else {
                sendMessage(message as string)
            }
        }
    }

    return (
        <Box sx={{ p: 1 }}>
            <form action={handleSubmit}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        id="message"
                        name="message"
                        placeholder="Type a prompt..."
                        multiline
                        rows={4}
                        sx={{ width: '100%' }}
                    />
                    <IconButton
                        type="submit"
                        color="primary"
                        size="large"
                        sx={{
                            position: 'absolute',
                            right: 1,
                            bottom: 1
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
                <FormControlLabel control={<Switch name="addition" />} label="Add page content to prompt" />
            </form>
        </Box>
    )
}

export default ChatInput

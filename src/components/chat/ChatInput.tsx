import { FC, useState } from "react"
import { Box, TextField, IconButton, FormControlLabel, Switch } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import useChatStore from "../../store/chat"

const ChatInput: FC = () => {
    const { sendMessage } = useChatStore()
    const [addition, setAddition] = useState<boolean>(false)

    const onAdditionChange = () => {
        setAddition(!addition)
    }

    const handleSubmit = async (formData: FormData) => {
        const message = formData.get('message')
        
        if (message) {
            if (addition) {
                const pageContent: PageContentPayload = await chrome.runtime.sendMessage({ type: 'getPageContent' })
                if (pageContent.html && pageContent.url) {
                    sendMessage(message as string, pageContent.url, pageContent.html, true)
                }
            } else {
                sendMessage(message as string, '', '', true)
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
                <FormControlLabel 
                    control={<Switch value={addition} onChange={onAdditionChange} />} 
                    label="Add page content to prompt" 
                />
            </form>
        </Box>
    )
}

export default ChatInput

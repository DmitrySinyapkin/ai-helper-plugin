import { FC } from "react"
import { Card, CardContent, CardActions, Typography, IconButton, Tooltip } from "@mui/material"
import { NoteAdd } from "@mui/icons-material"
import { blue  } from "@mui/material/colors"

const ChatMessage: FC<Message> = ({ role, content, url }) => {
    return (
        <Card 
            sx={{ 
                maxWidth: '75%',
                //mt: 2,
                bgcolor: role === 'user' ? blue[100] : '#FFFFFF',
                alignSelf: role === 'user' ? 'end' : 'start' 
            }}
        >
            <CardContent>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {content}
                </Typography>
            </CardContent>
            {role !== 'user' && <CardActions>
                <Tooltip title='Add to notes'>
                    <IconButton size="small">
                        <NoteAdd />
                    </IconButton>
                </Tooltip>
            </CardActions>}
        </Card>
    )
}

export default ChatMessage

import { FC } from "react"
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material"
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
                <Button size="small" color="primary">Add to notes</Button>
            </CardActions>}
        </Card>
    )
}

export default ChatMessage

import { FC } from "react"
import { Card, CardContent, CardActions, Typography, IconButton, Tooltip } from "@mui/material"
import { NoteAdd } from "@mui/icons-material"
import { blue, red } from "@mui/material/colors"
import useUserStore from "../../store/user"
import useNotesStore from "../../store/notes"

const ChatMessage: FC<Message> = ({ role, content, url, isError }) => {
    const { user } = useUserStore()
    const { editNote } = useNotesStore()

    const handleAddToNotesClick = () => {
        editNote({ content, url })
    }

    return (
        <Card 
            sx={{ 
                maxWidth: '75%',
                bgcolor: role === 'user' ? blue[100] : isError ? red[50] : '#FFFFFF',
                alignSelf: role === 'user' ? 'end' : 'start' 
            }}
        >
            <CardContent>
                <Typography 
                    variant="caption" 
                    sx={{ 
                        whiteSpace: 'pre-wrap',
                        color: isError ? red[700] : 'inherit'
                    }}
                >
                    {content}
                </Typography>
            </CardContent>
            {role !== 'user' && !isError && <CardActions>
                <Tooltip title={user ? 'Add to notes' : 'Add to notes (login to add)'}>
                    <span>
                        <IconButton size="small" color="primary" disabled={!user} onClick={handleAddToNotesClick}>
                            <NoteAdd />
                        </IconButton>
                    </span>
                </Tooltip>
            </CardActions>}
        </Card>
    )
}

export default ChatMessage

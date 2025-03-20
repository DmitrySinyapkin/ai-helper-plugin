import { FC } from "react"
import { Card, CardContent, CardActions, Typography, IconButton, Tooltip } from "@mui/material"
import { NoteAdd } from "@mui/icons-material"
import { blue  } from "@mui/material/colors"
import useUserStore from "../../store/user"
import useNotesStore from "../../store/notes"

const ChatMessage: FC<Message> = ({ role, content, url }) => {
    const { user } = useUserStore()
    const { editNote } = useNotesStore()

    const handleAddToNotesClick = () => {
        editNote({ content, url })
    }

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
                <Tooltip title={user ? 'Add to notes' : 'Add to notes (login to add)'}>
                    <span>
                        <IconButton size="small" disabled={!user} onClick={handleAddToNotesClick}>
                            <NoteAdd />
                        </IconButton>
                    </span>
                </Tooltip>
            </CardActions>}
        </Card>
    )
}

export default ChatMessage

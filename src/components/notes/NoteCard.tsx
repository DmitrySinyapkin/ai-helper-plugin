import { FC, useState } from "react"
import { Card, CardHeader, CardContent, CardActions, Typography, Box, Button } from "@mui/material"
import { EditNote, Feedback, Delete } from "@mui/icons-material"
import { getOriginFromUrlString } from "../../utils/urlUtils"
import useNotesStore from "../../store/notes"
import NavMenu from "../common/NavMenu"

interface Props {
    note: Note
}

const NoteCard: FC<Props> = ({ note }) => {
    const { editNote, deleteNote } = useNotesStore()
    const [showContent, setShowContent] = useState(false)

    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    const handleEdit = () => {
        editNote(note)
    }

    const handleDelete = () => {
        deleteNote(note.id)
    }

    const actions = [
        {
            label: "Edit note",
            icon: <EditNote />,
            onClick: handleEdit
        },
        {
            label: "Add note to prompt",
            icon: <Feedback />,
            onClick: () => {}
        },
        {
            label: "Delete note",
            icon: <Delete />,
            onClick: handleDelete
        }
    ]

    return (
        <Card sx={{ width: 368 }}>
            <CardHeader
                title={note.title}
                subheader={getOriginFromUrlString(note.url)}
            />
            <CardContent>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={showContent
                        ? { overflow : 'visible' }
                        : { overflow : 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                        }
                    }
                >
                    {note.content}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button size='small' onClick={toggleShowContent}>
                        {showContent ? 'Hide' : 'Show' }
                    </Button>
                </Box>
            </CardContent>
            <CardActions>
                <NavMenu items={actions} />
            </CardActions>
        </Card>
    )
}

export default NoteCard

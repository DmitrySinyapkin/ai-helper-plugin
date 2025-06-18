import { FC, useState, MouseEvent } from "react"
import { Card, CardHeader, CardContent, CardActions, Typography, Box, Chip, Tooltip, Link } from "@mui/material"
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

    const openNewTab = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()
        chrome.tabs.create({ url: note.url, active: false })
        return false
    }

    const actions = [
        {
            label: "Edit note",
            icon: <EditNote />,
            onClick: handleEdit
        },
        /* {
            label: "Add note to prompt",
            icon: <Feedback />,
            onClick: () => {}
        }, */
        {
            label: "Delete note",
            icon: <Delete />,
            onClick: handleDelete
        }
    ]

    return (
        <Card sx={{ width: 368 }}>
            <CardHeader
                title={
                    <Typography variant="subtitle2">
                        {note.title}
                    </Typography>
                }
                subheader={
                    <Tooltip title={note.url}>
                        <Link 
                            variant="caption" 
                            color="text.secondary" 
                            underline="none"
                            sx={{ cursor: 'pointer' }} 
                            onClick={openNewTab}
                        >
                            {getOriginFromUrlString(note.url)}
                        </Link>
                    </Tooltip>
                }
            />
            <CardContent>
                <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={showContent
                        ? { overflow : 'visible', whiteSpace: 'pre-wrap' }
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
                <Box sx={{ pt: 1, pr: 1, display: 'flex', flexDirection: 'row-reverse' }}>
                    <Chip 
                        label={showContent ? 'Hide' : 'Show' } 
                        size='small' color="primary" 
                        onClick={toggleShowContent} 
                    />
                </Box>
            </CardContent>
            <CardActions>
                <NavMenu items={actions} size="small" color="primary" />
            </CardActions>
        </Card>
    )
}

export default NoteCard

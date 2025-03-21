import { FC } from "react"
import { Box } from "@mui/material"
import NoteList from "../notes/NoteList"

const NotesScreen: FC = () => {
    return (
        <Box sx={{ height: 536 }}>
            <NoteList />
        </Box>
    )
}

export default NotesScreen

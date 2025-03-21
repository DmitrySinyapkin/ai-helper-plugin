import { FC, useEffect } from "react"
import Grid from '@mui/material/Grid2'
import { Box } from "@mui/material"
import NoteCard from "./NoteCard"
import FullscreenPopup from "../common/FullscreenPopup"
import NoteEditForm from "./NoteEditForm"
import useNotesStore from "../../store/notes"
import { blue  } from "@mui/material/colors"

const NoteList: FC = () => {
    const { notes, getNotes, openedNote, mode } = useNotesStore()

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <Box sx={{ position: 'relative' }}>
            <Grid container>
                <Grid size={4}>

                </Grid>
                <Grid size={8}>
                    <Box sx={{ height: 520, p: 1, overflowY: 'auto', bgcolor: blue[50] }}>
                        {notes.map((note) => <Box sx={{ pb: 1 }}>
                            <NoteCard note={note} />
                        </Box>)}
                    </Box>
                </Grid>
            </Grid>
            <FullscreenPopup show={openedNote !== null && mode === 'edit'}>
                <NoteEditForm />
            </FullscreenPopup>
        </Box>
    )
}

export default NoteList

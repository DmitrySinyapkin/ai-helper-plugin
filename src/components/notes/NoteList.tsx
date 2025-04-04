import { FC, useEffect, useState } from "react"
import Grid from '@mui/material/Grid2'
import { Box } from "@mui/material"
import NoteCard from "./NoteCard"
import FullscreenPopup from "../common/FullscreenPopup"
import NoteEditForm from "./NoteEditForm"
import NoteFilters from "./NoteFilters"
import useNotesStore from "../../store/notes"
import { blue  } from "@mui/material/colors"
import { defaultUrlFilterOptions, getUrlFilterOptions, getFilteredByUrlNotes } from "../../utils/notesUtils"

const NoteList: FC = () => {
    const { notes, getNotes, openedNote, mode } = useNotesStore()

    const [urlFilter, setUrlFilter] = useState('all')
    const [urlOptions, setUrlOptions] = useState(defaultUrlFilterOptions)
    const [filteredNotes, setFilteredNotes] = useState(notes)

    useEffect(() => {
        getNotes()
    }, [])

    useEffect(() => {
        setUrlOptions(getUrlFilterOptions(notes))
    }, [notes])

    useEffect(() => {
        (async () => {
            const filteredNotes = await getFilteredByUrlNotes(notes, urlFilter)
            setFilteredNotes(filteredNotes)
        })()
    }, [notes, urlFilter])

    const onFilterChange = (filter: NoteFilters, value: string) => {
        if (filter === 'url') {
            setUrlFilter(value)
        }
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Grid container>
                <Grid size={4} sx={{ p: 1 }}>
                    <NoteFilters
                        options={urlOptions}
                        onChange={onFilterChange}
                    />
                </Grid>
                <Grid size={8}>
                    <Box sx={{ height: 520, p: 1, overflowY: 'auto', bgcolor: blue[50] }}>
                        {filteredNotes.map((note) => <Box sx={{ pb: 1 }}>
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

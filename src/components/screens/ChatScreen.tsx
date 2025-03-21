import { FC } from "react"
import { Box } from "@mui/material"
import AiChat from "../chat"
import FullscreenPopup from "../common/FullscreenPopup"
import NoteEditForm from "../notes/NoteEditForm"
import useNotesStore from "../../store/notes"

const ChatScreen: FC = () => {
    const { openedNote, mode } = useNotesStore()

    return (
        <Box sx={{ height: 536, position: 'relative' }}>
            <AiChat />
            <FullscreenPopup show={openedNote !== null && mode === 'edit'}>
                <NoteEditForm />
            </FullscreenPopup>
        </Box>
    )
}

export default ChatScreen

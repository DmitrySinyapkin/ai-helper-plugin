import { FC, ReactNode } from "react"
import { Paper } from "@mui/material"

interface Props {
    show: boolean
    children: ReactNode
}

const FullscreenPopup: FC<Props> = ({ show, children }) => {
    if (show) {
        return (
            <Paper elevation={3} sx={{ width: 600, height: 536, position: 'absolute', inset: 0 }}>
                {children}
            </Paper>
        )
    }
}

export default FullscreenPopup

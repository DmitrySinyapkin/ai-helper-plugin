import { FC, ReactElement } from "react"
import useAppStore, { Screen } from "../../store/app"
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

interface Props {
    label: string
    to: Screen
    icon?: ReactElement 
}

const NavButton: FC<Props> = ({ label, to, icon }) => {
    const { setScreen } = useAppStore()

    const handleClick = () => {
        setScreen(to)
    }

    if (icon) {
        return (
            <Tooltip title={label}>
                <IconButton size="large" color="inherit" onClick={handleClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Button sx={{ color: '#fff' }} onClick={handleClick}>
            {label}
        </Button>
    )
}

export default NavButton

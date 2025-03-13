import { FC } from "react"
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import BurgerMenu from "./BurgerMenu"
import ScreenTitle from "./ScreenTitle"
import UserMenu from "./userMenu"

const Header: FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BurgerMenu />
                    <ScreenTitle />
                    <UserMenu />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

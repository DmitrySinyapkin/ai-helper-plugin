import { FC, useEffect } from "react"
import { Box, Button } from "@mui/material"
import useUserStore from "../../store/user"
import useAppStore, { Screens } from "../../store/app"

const ProfileScreen: FC = () => {
    const { user, logout } = useUserStore()
    const { setScreen } = useAppStore()

    useEffect(() => {
        if (!user) {
            setScreen(Screens.chat)
        }
    }, [user])

    return (
        <Box>
            <h1>Profile Screen</h1>
            <Button onClick={logout}>Log Out</Button>
        </Box>
    )
}

export default ProfileScreen

import { FC, useEffect } from "react"
import { Box, Button, Avatar, Typography } from "@mui/material"
import useUserStore from "../../store/user"
import useAppStore, { Screens } from "../../store/app"
import { deepOrange } from "@mui/material/colors"

const UserProfile: FC = () => {
    const { user, logout } = useUserStore()
    const { setScreen } = useAppStore()

    useEffect(() => {
        if (!user) {
            setScreen(Screens.chat)
        }
    }, [user])

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ m: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{ user?.email[0].toUpperCase() }</Avatar>
                <Typography variant="h6" gutterBottom>{ user?.email }</Typography>
            </Box>
            <Button sx={{ ml: 10 }} variant="contained" onClick={logout}>Log Out</Button>
        </Box>
    )
}

export default UserProfile

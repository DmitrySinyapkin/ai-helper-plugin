import { FC } from "react"
import { Box } from "@mui/material"
import LoginForm from "../auth/LoginForm"

const LoginScreen: FC = () => {
    return (
        <Box sx={{ height: 536, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
            <LoginForm />
        </Box>
    )
}

export default LoginScreen

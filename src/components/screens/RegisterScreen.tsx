import { FC } from "react"
import { Box } from "@mui/material"
import RegisterForm from "../auth/RegisterForm"

const RegisterScreen: FC = () => {
    return (
        <Box sx={{ height: 536, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
            <RegisterForm />
        </Box>
    )
}

export default RegisterScreen

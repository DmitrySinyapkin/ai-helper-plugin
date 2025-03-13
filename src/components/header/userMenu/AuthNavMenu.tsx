import { FC } from "react"
import NavMenu from "../../common/NavMenu"
import { Screens } from "../../../store/app"
import Chat from "@mui/icons-material/Chat"

const items = [
    {
        label: 'Chat',
        to: Screens.chat,
        icon: <Chat />
    },
    {
        label: 'Log In',
        to: Screens.login,
    },
    {
        label: 'Sign Up',
        to: Screens.register
    }
]


const AuthNavMenu: FC = () => {
    return (
        <NavMenu items={items} />
    )
}

export default AuthNavMenu

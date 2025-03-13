import { FC } from "react"
import NavMenu from "../../common/NavMenu"
import { Screens } from "../../../store/app"
import Chat from "@mui/icons-material/Chat"
import Summarize from "@mui/icons-material/Summarize"
import AccountCircle from '@mui/icons-material/AccountCircle'

const items = [
    {
        label: 'Chat',
        to: Screens.chat,
        icon: <Chat />
    },
    {
        label: 'Notes',
        to: Screens.notes,
        icon: <Summarize />
    },
    {
        label: 'Profile',
        to: Screens.register,
        icon: <AccountCircle />
    }
]


const UserNavMenu: FC = () => {
    return (
        <NavMenu items={items} />
    )
}

export default UserNavMenu

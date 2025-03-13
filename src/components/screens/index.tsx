import { FC } from "react"
import useAppStore, { Screens } from "../../store/app"
import ChatScreen from "./ChatScreen"
import LoginScreen from "./LoginScreen"
import RegisterScreen from "./RegisterScreen"
import ProfileScreen from "./ProfileScreen"
import NotesScreen from "./NotesScreen"

const routes = [
    {
        name: Screens.chat,
        component: <ChatScreen />
    },
    {
        name: Screens.login,
        component: <LoginScreen />
    },
    {
        name: Screens.register,
        component: <RegisterScreen />
    },
    {
        name: Screens.profile,
        component: <ProfileScreen />
    },
    {
        name: Screens.notes,
        component: <NotesScreen />
    },
]

const ScreenRouter: FC = () => {
    const { screen } = useAppStore()

    return (
        <>
            {routes.find(route => route.name === screen)!.component}
        </>
    )
}

export default ScreenRouter

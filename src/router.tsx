import { Screens, Screen } from "./store/app"
import ChatScreen from "./components/screens/ChatScreen"
import LoginScreen from "./components/screens/LoginScreen"
import RegisterScreen from "./components/screens/RegisterScreen"
import ProfileScreen from "./components/screens/ProfileScreen"
import NotesScreen from "./components/screens/NotesScreen"

interface Route {
    name: Screen,
    component: React.ReactElement,
}

export const routes: Route[] = [
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

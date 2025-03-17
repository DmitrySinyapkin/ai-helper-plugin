import { FC } from "react"
import useUserStore from "../../../store/user"
import AuthNavMenu from "./AuthNavMenu"
import UserNavMenu from "./UserNavMenu"

const UserMenu: FC = () => {
    const { user } = useUserStore()

    if (user?.id) {
        return <UserNavMenu />
    }

    return <AuthNavMenu />
}

export default UserMenu

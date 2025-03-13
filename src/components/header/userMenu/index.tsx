import { FC } from "react"
import useUserStore from "../../../store/user"
import AuthNavMenu from "./AuthNavMenu"
import UserNavMenu from "./UserNavMenu"

const UserMenu: FC = () => {
    const { isAuth } = useUserStore()

    if (!isAuth) {
        return <UserNavMenu />
    }

    return <AuthNavMenu />
}

export default UserMenu

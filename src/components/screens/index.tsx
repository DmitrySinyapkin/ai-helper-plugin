import { FC } from "react"
import useAppStore from "../../store/app"
import { routes } from "../../router"

const ScreenRouter: FC = () => {
    const { screen } = useAppStore()

    return (
        <>
            {routes.find(route => route.name === screen)!.component}
        </>
    )
}

export default ScreenRouter

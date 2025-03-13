import { FC, ReactElement } from "react"
import { Box } from "@mui/material"
import NavButton from "./NavButton"
import { Screen } from "../../store/app"

interface Item {
    label: string
    to: Screen
    icon?: ReactElement 
}

interface Props {
    items: Item[]
}

const NavMenu: FC<Props> = ({ items }) => {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {items.map((item) => (
                <NavButton
                    key={item.label}
                    label={item.label}
                    to={item.to}
                    icon={item.icon}
                />
            ))}
        </Box>
    )
}

export default NavMenu

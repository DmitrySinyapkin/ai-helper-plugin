import { FC, ReactElement } from "react"
import { Box } from "@mui/material"
import NavButton from "./NavButton"
import { Screen } from "../../store/app"

interface Item {
    label: string
    to?: Screen
    onClick?: Function
    icon?: ReactElement
    size?: "small" | "medium" | "large"
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

interface Props {
    items: Item[]
    size?: "small" | "medium" | "large"
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

const NavMenu: FC<Props> = ({ items, size, color }) => {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {items.map((item) => (
                <NavButton
                    key={item.label}
                    label={item.label}
                    to={item.to}
                    onClick={item.onClick}
                    icon={item.icon}
                    size={item.size || size}
                    color={item.color || color}
                />
            ))}
        </Box>
    )
}

export default NavMenu

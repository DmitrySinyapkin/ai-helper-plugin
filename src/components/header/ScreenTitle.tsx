import { FC } from 'react'
import useAppStore, { Screens } from '../../store/app'
import Typography from '@mui/material/Typography'

const titles = {
    [Screens.chat]: 'AI Chat',
    [Screens.profile]: 'Settings',
    [Screens.login]: 'Log In',
    [Screens.register]: 'Sign Up',
    [Screens.notes]: 'Notes',
}

const ScreenTitle: FC = () => {
    const { screen } = useAppStore()

    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titles[screen] || ''}
        </Typography>
    )
}

export default ScreenTitle

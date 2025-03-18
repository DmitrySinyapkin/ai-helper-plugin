import { FC, useState, useEffect, MouseEvent, useTransition, FormEvent } from "react"
import { Box, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import FormSubmitButton from "../common/FormSubmitButton"
import * as Yup from "yup"
import useUserStore from "../../store/user"
import useAppStore, { Screens } from "../../store/app"

interface FieldErrors {
    email?: string
    password?: string
}

const LoginForm: FC = () => {
    const [errors, setErrors] = useState<FieldErrors>({})
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const schema = Yup.object({
        email: Yup.string().email("Invalid email").required(),
        password: Yup.string().required().min(8),
    })

    const { login, user } = useUserStore()
    const { setScreen } = useAppStore()

    const [isPending, startTransition] = useTransition()

    const action = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries())
        try {
            await schema.validate(data, { abortEarly: false })
            setErrors({})
            
            login(formData.get('email') as string, formData.get('password') as string)
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setErrors(err.inner.reduce((acc, error) => error.path ? {...acc, [error.path]: error.message} : acc, {}))
            } else {
                setErrors({ email: "Invalid email or password" })
            }
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(() => action(formData))
    }

    useEffect(() => {
        if (user?.id) {
            setScreen(Screens.chat)
        }
    }, [user])

    return (
        <Box sx={{ width: 500, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
            <Typography variant="h3" gutterBottom>
                Log In
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: 20 }}>
                <TextField 
                    id="email"
                    name="email"
                    label="Email"
                    variant="standard"
                    sx={{ width: '100%' }}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                />
                <FormControl variant="standard" error={errors.password ? true : false}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        aria-describedby="password-error-text"
                        sx={{ width: '100%' }}
                    />
                    <FormHelperText id="password-error-text">{errors.password}</FormHelperText>
                </FormControl>
                <FormSubmitButton label="Log In" isPending={isPending} />
            </form>
        </Box>
    )
}

export default LoginForm

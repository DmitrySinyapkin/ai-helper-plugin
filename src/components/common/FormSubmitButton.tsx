import { Button } from "@mui/material"
import { FC } from "react"
import { useFormStatus } from "react-dom"

interface Props {
    label: string
    isPending?: boolean
}

const FormSubmitButton: FC<Props> = ({ label, isPending }) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            variant="contained"
            loading={pending || isPending}
            loadingPosition="start"
        >
            {label}
        </Button>
    )
}

export default FormSubmitButton

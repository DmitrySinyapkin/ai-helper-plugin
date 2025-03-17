import { Button } from "@mui/material"
import { FC } from "react"
import { useFormStatus } from "react-dom"

interface Props {
    label: string
}

const FormSubmitButton: FC<Props> = ({ label }) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            variant="contained"
            loading={pending}
            loadingPosition="start"
        >
            {label}
        </Button>
    )
}

export default FormSubmitButton

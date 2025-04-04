import { FC, FormEvent, useState, useTransition } from "react"
import { Typography, TextField, Box, Button } from "@mui/material"
import useNotesStore from "../../store/notes"
import * as Yup from "yup"
import FormSubmitButton from "../common/FormSubmitButton"

interface Errors {
    content?: string
    url?: string
}

const NoteEditForm: FC = () => {
    const { openedNote, cancelEdit, createNote, updateNote } = useNotesStore()
    const [isPending, startTransition] = useTransition()
    const [errors, setErrors] = useState<Errors>({})

    const schema = Yup.object({
        title: Yup.string(),
        url: Yup.string().url(),
        content: Yup.string().required()
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(() => action(formData))
    }

    const action = async (formData: FormData) => {
        const data = Object.fromEntries(formData)

        try {
            await schema.validate(data, { abortEarly: false })
            setErrors({})
            
            if (openedNote?.id && openedNote?.created_at && openedNote.user_id) {
                updateNote({
                    id: openedNote.id,
                    created_at: openedNote.created_at,
                    user_id: openedNote.user_id,
                    title: data.title as string,
                    url: data.url as string,
                    content: data.content as string
                })
            } else {
                createNote(data)
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setErrors(err.inner.reduce((acc, error) => error.path ? {...acc, [error.path]: error.message} : acc, {}))
            } else {
                setErrors({ content: openedNote?.id ? "Error creating note" : "Error updating note" })
            }
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            style={{
                padding: '16px', 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: 'center', 
                alignItems: "center", 
                gap: 20 
            }}
        >
            <Typography variant="h4" gutterBottom>
                {openedNote?.id ? 'Edit note' : 'Create note'}
            </Typography>
            <TextField
                id="title"
                name="title"
                label="Title"
                defaultValue={openedNote?.title || ''}
                variant="standard"
                fullWidth
            />
            <TextField
                id="url"
                name="url"
                label="Url"
                defaultValue={openedNote?.url || ''}
                variant="standard"
                fullWidth
                error={errors.url ? true : false}
                helperText={errors.url}
            />
            <TextField
                id="content"
                name="content"
                defaultValue={openedNote?.content || ''}
                fullWidth
                multiline
                rows={8}
                error={errors.content ? true : false}
                helperText={errors.content}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button variant="contained" color="primary" onClick={cancelEdit}>Cancel</Button>
                <FormSubmitButton label={openedNote?.id ? 'Save changes' : 'Create note'} isPending={isPending} />
            </Box>
        </form>
    )
}

export default NoteEditForm

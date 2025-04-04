import { FC } from "react"
import { Autocomplete, TextField } from "@mui/material";

interface Props {
    options: string[]
    onChange: (field: NoteFilters, value: string) => void
}

const NoteFilters: FC<Props> = ({ options, onChange }) => {
    return (
        <Autocomplete
            options={options}
            defaultValue="all"
            onChange={(event: any, newValue: string | null) => {
                onChange('url', newValue || '')
              }}
            renderInput={(params) => (
                <TextField {...params} label="Url" variant="standard" />
            )}
            autoSelect
        />
    )
}

export default NoteFilters

import { FC, useEffect } from 'react'
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material'
import useChatStore from '../../store/chat'

const ModelSelector: FC = () => {
    const { models, selectedModel, getModels, setSelectedModel } = useChatStore()

    useEffect(() => {
        getModels()
    }, [])

    return (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
                id="model-select"
                value={selectedModel || ''}
                onChange={(e) => setSelectedModel(e.target.value)}
                disableUnderline
                sx={{ fontSize: 14 }}
            >
                {models.map((model) => (
                    <MenuItem key={model.id} value={model.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography variant="body2">{model.id}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                {model.context_length / 1000}k
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ModelSelector
 
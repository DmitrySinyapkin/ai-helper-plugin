interface Note {
    id: number
    created_at: string
    user_id: number
    url: string
    content: string | null
    title: string
}

type NoteFilters = 'url' 

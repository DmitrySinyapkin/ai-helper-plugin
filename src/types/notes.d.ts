interface Note {
    id: number
    created_at: string
    user_id: number
    url: string
    content: string
    title: string
}

type NoteFilters = 'url' 

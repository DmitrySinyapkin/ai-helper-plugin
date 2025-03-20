import { create } from 'zustand'
import api from '../api/api'
import { notesUrl } from '../api/endpoints'
import { AxiosError } from 'axios'

interface NotesStore {
    notes: Note[]
    openedNote: Partial<Note> | null
    mode: 'edit' | 'view' | null
    getNotes: () => void
    getNoteById: (id: number) => void
    viewNote: (note: Partial<Note>) => void
    editNote: (note: Partial<Note>) => void
    cancelEdit: () => void
    createNote: (note: Partial<Note>) => void
    updateNote: (note: Note) => void
    deleteNote: (id: number) => void
}

const useNotesStore = create<NotesStore>((set, get) => ({
    notes: [],
    openedNote: null,
    mode: null,
    getNotes: async () => {
        try {
            const notes: Note[] = await api.get(notesUrl)
            set({ notes })
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    getNoteById: async (id: number) => {
        try {
            const note: Note = await api.get(`${notesUrl}/${id}`)
            set({ openedNote: note })
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    viewNote: (note: Partial<Note>) => {
        set({ openedNote: note, mode: 'view' })
    },
    editNote: (note: Partial<Note>) => {
        set({ openedNote: note, mode: 'edit' })
    },
    cancelEdit: () => {
        set({ openedNote: null, mode: null })
    },
    createNote: async (note: Partial<Note>) => {
        try {
            const created: Note = await api.post(notesUrl, note)

            if (created.id) {
                set({
                    notes: [...get().notes, created],
                    openedNote: null,
                    mode: null
                })
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    updateNote: async (note: Note) => {
        try {
            const updated: Note = await api.put(`${notesUrl}/${note.id}`, note)

            if (updated.id) {
                set({ 
                    notes: get().notes.map(n => n.id === updated.id ? updated : n),
                    openedNote: null,
                    mode: null
                })
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    deleteNote: async (id: number) => {
        try {
            const { message }: { message: string } = await api.delete(`${notesUrl}/${id}`)

            if (message.includes('deleted')) {
                set({ notes: get().notes.filter(n => n.id !== id) })
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    }
}))

export default useNotesStore

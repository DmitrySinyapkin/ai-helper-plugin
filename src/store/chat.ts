import { create } from 'zustand'
import api from '../api/api'
import { chatUrl } from '../api/endpoints'
import chromeStorage from '../utils/chromeStorage'
import { AxiosError } from 'axios'

interface ChatStore {
    messages: Message[]
    pending: boolean
    sendMessage: (message: string, url?: string, html?: string) => void
    getHistory: () => void
    clearHistory: () => void
}

const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    pending: false,
    sendMessage: async (message: string, url?: string, html?: string) => {
        set({
            messages: [...get().messages, {role: 'user', content: message, url: url || ''}],
            pending: true
        })
        try {
            const prompt = html ? `${message}\n\n${html}` : message
            const response: ChatCompletion = await api.post(chatUrl, { prompt })

            if (response.choices.length > 0) {
                set({ messages: [...get().messages, {...response.choices[0].message, url: url || ''}] })
            } else {
                set({ messages: [...get().messages, {role: 'assistant', content: 'Error during getting response', url: url || ''}] })
            }
        } catch (error) {
            set({ messages: [...get().messages, {role: 'assistant', content: 'Error during getting response', url: url || ''}] })
        }
        await chromeStorage.set({ chatHistory: JSON.stringify(get().messages) })
        set({ pending: false })
    },
    getHistory: async () => {
        const { chatHistory } = await chromeStorage.get(['chatHistory'])
        if (chatHistory) {
            set({ messages: JSON.parse(chatHistory) })
        }
    },
    clearHistory: async () => {
        await chromeStorage.remove(['chatHistory'])
        set({ messages: [] })
    },
}))

export default useChatStore

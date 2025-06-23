import { create } from 'zustand'
import api from '../api/api'
import { chatUrl } from '../api/endpoints'
import chromeStorage from '../utils/chromeStorage'
import { getAvailableModels, getChatCompletion } from '../api/openrouter'
import OpenAI from 'openai'

interface ChatStore {
    messages: Message[]
    pending: boolean
    models: OpenRouterModel[]
    selectedModel: string | null
    sendMessage: (message: string, url?: string, html?: string, direct?: boolean) => void
    getHistory: () => void
    clearHistory: () => void
    getModels: () => Promise<void>
    setSelectedModel: (model: string) => void
    deleteMessage: (index: number) => void
}

const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    pending: false,
    models: [],
    selectedModel: null,
    sendMessage: async (message: string, url?: string, html?: string, direct: boolean = false) => {
        set({
            messages: [...get().messages, {role: 'user', content: message, url: url || ''}],
            pending: true
        })
        try {
            if (get().selectedModel) {
                const prompt = html ? `${message}\n\n${html}` : message
                const response: Partial<ChatCompletion> | null = direct ? 
                    await getChatCompletion(prompt, get().selectedModel!) : 
                    await api.post(chatUrl, { prompt })

                if (response?.choices?.length && response.choices.length > 0) {
                    set({ messages: [...get().messages, {...response.choices[0].message, url: url || ''}] })
                } else {
                    set({ messages: [...get().messages, {role: 'assistant', content: 'Error during getting response', url: url || '', isError: true}] })
                }
            }
        } catch (error: any) {
            let errorMessage = 'Error during getting response'
            
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message
            } else if (error?.message) {
                errorMessage = error.message
            } else if (typeof error === 'string') {
                errorMessage = error
            }
            
            set({ messages: [...get().messages, {role: 'assistant', content: errorMessage, url: url || '', isError: true}] })
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
    getModels: async () => {
        const models = await getAvailableModels()
        set({ models, selectedModel: models[0].id })
    },
    setSelectedModel: (model: string) => {
        set({ selectedModel: model })
    },
    deleteMessage: async (index: number) => {
        const messages = get().messages.filter((_, i) => i !== index)
        set({ messages })
        await chromeStorage.set({ chatHistory: JSON.stringify(messages) })
    }
}))

export default useChatStore

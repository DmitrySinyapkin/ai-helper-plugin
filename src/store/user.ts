import { create } from 'zustand'
import api from '../api/api'
import { userInfoUrl, loginUrl, registerUrl } from '../api/endpoints'
import chromeStorage from '../utils/chromeStorage'

interface UserStore {
    user: User | null
    loading: boolean
    getUser: () => Promise<void>
    registerUser: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    loading: false,
    getUser: async () => {
        set({ loading: true })
        try {
            const user: User = await api.get(userInfoUrl)

            if (user?.id) {
                set({ user, loading: false })
            } else {
                throw 'User not found'
            }
        } catch (error) {
            set({ loading: false })
            throw error
        }
    },
    registerUser: async (email: string, password: string) => {
        set({ loading: true })
        try {
            const user: User = await api.post(registerUrl, { email, password })

            if (user?.id) {
                await get().login(email, password)
                set({ user })
            } else {
                throw 'User not created'
            }
        } catch (error) {
            set({ loading: false })
            throw error
        }
    },
    login: async (email, password) => {
        set({ loading: true })
        try {
            const token: Token = await api.post(loginUrl, { email, password })

            if (token.access && token.refresh) {
                await chromeStorage.set({ access: token.access, refresh: token.refresh })
                if (get().user === null) {
                    await get().getUser()
                }
            } else {
                throw 'Invalid credentials'
            }
        } catch (error) {
            set({ loading: false })
            throw error
        } 
    },
    logout: async () => {
        set({ loading: true })
        try {
            await chromeStorage.remove([ 'access', 'refresh' ])
            set({ user: null, loading: false })
        } catch (error) {
            set({ loading: false })
            throw error
        }
    },
}))

export default useUserStore

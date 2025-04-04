import { create } from 'zustand'
import api from '../api/api'
import { userInfoUrl, loginUrl, registerUrl } from '../api/endpoints'
import chromeStorage from '../utils/chromeStorage'
import { AxiosError } from 'axios'

interface UserStore {
    user: User | null
    loading: boolean
    getUser: () => void
    registerUser: (email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
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
                throw new Error('User not found')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    registerUser: async (email: string, password: string) => {
        try {
            const user: User = await api.post(registerUrl, { email, password })

            if (user?.id) {
                get().login(email, password)
                set({ user })
            } else {
                throw new Error('User not created')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        }
    },
    login: async (email, password) => {
        try {
            const token: Token = await api.post(loginUrl, { email, password })

            if (token.access && token.refresh) {
                await chromeStorage.set({ access: token.access, refresh: token.refresh })
                if (get().user === null) {
                    get().getUser()
                }
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.message)
            }
        } 
    },
    logout: async () => {
        await chromeStorage.remove([ 'access', 'refresh' ])
        set({ user: null })
    },
}))

export default useUserStore

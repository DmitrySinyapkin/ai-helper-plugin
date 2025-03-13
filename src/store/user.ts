import { create } from 'zustand'
import api from '../api/api'
import { userInfoUrl, loginUrl } from '../api/endpoints'
import chromeStorage from '../chromeStorage/storage'

interface UserStore {
    user: User | null
    loading: boolean
    isAuth: () => boolean
    getUser: () => void
    login: (email: string, password: string) => void
    logout: () => void
}

const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    loading: false,
    isAuth: () => get().user !== null,
    getUser: async () => {
        set({ loading: true })
        try {
            const user: User = await api.get(userInfoUrl)

            if (user.id) {
                set({ user, loading: false })
            } else {
                throw new Error('User not found')
            }
        } catch (error) {
            console.error(error)
        }
    },
    login: async (email, password) => {
        try {
            const token: Token = await api.post(loginUrl, { email, password })

            if (token.access) {
                await chromeStorage.set({ access: token.access, refresh: token.refresh })
                get().getUser()
            }
        } catch (error) {
            console.error(error)
        } 
    },
    logout: async () => {
        await chromeStorage.remove([ 'access', 'refresh' ])
        set({ user: null })
    },
}))

export default useUserStore

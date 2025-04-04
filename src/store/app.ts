import { create } from 'zustand'

export enum Screens {
    chat = 'chat',
    profile = 'profile',
    login = 'login',
    register = 'register',
    notes = 'notes'
}

export type Screen = keyof typeof Screens

interface AppStore {
    screen: Screen,
    setScreen: (screen: Screen) => void,
}

const useAppStore = create<AppStore>((set) => ({
    screen: Screens.chat,
    setScreen: (screen) => set({ screen }),
}))

export default useAppStore

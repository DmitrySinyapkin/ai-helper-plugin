export enum StorageKeys {
    access = 'access',
    refresh = 'refresh',
    chatHistory = 'chatHistory',
}

export type StorageData = {
    [key in StorageKeys]?: string
}

const chromeStorage = {
    get: async (keys: Array<keyof typeof StorageKeys>) => {
        const result = await chrome.storage.local.get(keys)
        return result
    },

    set: async (data: StorageData) => {
        await chrome.storage.local.set(data)
    },

    remove: async (keys: Array<keyof typeof StorageKeys>) => {
        await chrome.storage.local.remove(keys)
    }
}

export default chromeStorage

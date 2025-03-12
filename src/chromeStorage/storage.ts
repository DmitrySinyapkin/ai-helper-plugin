export enum StorageKeys {
    access = 'access',
    refresh = 'refresh',
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
    }
}

export default chromeStorage

import { getOriginFromUrlString } from "./urlUtils"

export const defaultUrlFilterOptions = ['all', 'none', 'current']

export const getUrlFilterOptions = (notes: Note[]) => {
    const uniqueUrlFilters = [...new Set(notes.filter(note => note.url).map(note => getOriginFromUrlString(note.url)))].sort()
    return [...defaultUrlFilterOptions, ...uniqueUrlFilters]
}

export const getFilteredByUrlNotes = async (notes: Note[], urlFilter: string) => {
    if (urlFilter === 'all') {
        return notes
    }

    if (urlFilter === 'none') {
        return notes.filter(note => !note.url)
    }

    if (urlFilter === 'current') {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
        const url = tab.url ? getOriginFromUrlString(tab.url) : null

        if (url) {
            return notes.filter(note => note.url?.includes(url))
        }
        return notes
    }

    return notes.filter(note => note.url?.includes(urlFilter))
}

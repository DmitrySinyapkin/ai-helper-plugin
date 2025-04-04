export const getOriginFromUrlString = (str: string) => {
    try {
        const url = new URL(str)
        return url.origin
    } catch {
        return ''
    }
}

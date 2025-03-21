export const getOriginFromUrlString = (str: string) => {
    if (str) {
        const url = new URL(str)
        return url.origin
    }
    return ''
}

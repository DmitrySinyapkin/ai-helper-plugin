const removeTags = (root: HTMLElement) => {
    const tagsToRemove = ['script', 'style', 'noscript']

    tagsToRemove.forEach((tag) => {
        const elements = root.querySelectorAll(tag)
        elements.forEach((element) => element.remove())
    })
}

const minifyHTMLString = (html: string) => {
    return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')          
        .trim();
}

export const minifyHTML = (root: HTMLElement) => {
    removeTags(root)
    const innerHTML = root.innerHTML
    const minifiedHTML = minifyHTMLString(innerHTML)
    return minifiedHTML
}

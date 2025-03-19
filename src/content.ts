import { minifyHTML } from "./utils/minifyHTML"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getContent') {
        const bodyClone = document.body.cloneNode(true) as HTMLElement
        const minifiedBody = minifyHTML(bodyClone)

        const payload = {
            html: minifiedBody,
            url: window.location.href,
        }

        sendResponse(payload)
    }
})

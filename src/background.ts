console.log('Service Worker Started')

let pageContent: PageContentPayload | null = null

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getPageContent') {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const activeTab = tabs[0]
            if (activeTab?.id) {
                const response: PageContentPayload = await chrome.tabs.sendMessage(activeTab.id, { type: 'getContent'})
                
                if (response.html && response.url) {
                    sendResponse(response)
                }
            }
        })
    }
    return true
})

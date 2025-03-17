console.log('Service Worker Started')

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
})

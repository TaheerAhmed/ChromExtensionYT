chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function (results) {
        if (chrome.runtime.lastError) {
            console.error('Error injecting content script:', chrome.runtime.lastError);
        } else {
            console.log('Content script executed successfully');
        }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'videoUrls') {
        chrome.storage.local.set({ 'videoUrls': request.videoUrls }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error storing video URLs:', chrome.runtime.lastError);
            } else {
                console.log('Video URLs stored successfully');
            }
        });
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        console.log('Extension installed successfully');
    } else if (details.reason === 'update') {
        console.log('Extension updated successfully');
    }
});

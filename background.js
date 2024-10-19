chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "eyesite",
        title: "Eye Site",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "eyesite" && info.srcUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (imgUrl) => {
                    handleImage(imgUrl);
                },
                args: [info.srcUrl]
            });
        });
    }
});

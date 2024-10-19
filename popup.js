document.getElementById('selectImage').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    const handleClick = function () {
                        const imageUrl = this.src;
                        handleImage(imageUrl);
                        removeStylesAndListeners();
                    };

                    const removeStylesAndListeners = () => {
                        document.querySelectorAll('img').forEach((img) => {
                            img.removeEventListener('click', handleClick);
                            img.style.border = "";
                        });
                    };

                    document.querySelectorAll('img').forEach((img) => {
                        img.style.border = "2px solid red";
                        img.addEventListener('click', handleClick, { once: true });
                    });

                    document.addEventListener('click', (event) => {
                        if (!event.target.matches('img')) {
                            removeStylesAndListeners();
                        }
                    }, { once: true });
                }
            });
        });
    });
});

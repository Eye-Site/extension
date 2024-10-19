if (typeof data === 'undefined') {
    var data = "placeholder text for testing";
}

function addContent(image, data) {
    const alt = image.getAttribute('alt') || data;
    const p = document.createElement('p');
    p.setAttribute('class', 'eyesite');
    image.insertAdjacentElement('afterend', p);
    p.innerHTML = `${alt}`;

    addStyles();
}

function handleImage(imageUrl) {
    const img = document.querySelector(`img[src="${imageUrl}"]`);
    if (img) {
        addContent(img, data);
    } else {
        console.log(`Image not found: ${imageUrl}`);
    }
}

function addStyles() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('eyesite.css');
    style.id = 'eyesite-style';
    document.head.appendChild(style);
}
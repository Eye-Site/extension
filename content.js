if (typeof data === 'undefined') {
    var data = "placeholder text for testing";
}

async function rek(base64) {
    const response = await fetch('https://ckgqos29n6.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base64_image: base64
        })
    });
    const data = await response.json();
    console.log(data.ocrText);
    return data.ocrText;
}

function addContent(image, data) {
    const alt = image.getAttribute('alt') || data;

    const div = document.createElement('div')
    div.setAttribute('class', 'eyesite')

    const img = document.createElement('img')
    img.setAttribute('src', 'EyeSite_yellow_transparent.png')
    img.setAttribute('alt', '')

    const p = document.createElement('p')
    
    div.appendChild(img)
    div.appendChild(p)

    image.insertAdjacentElement('afterend', div)
    p.innerHTML = `${alt}`

    addStyles()
}

function handleImage(imageUrl) {
    var img = document.querySelector(`img[src="${imageUrl}"]`);
    console.log(img)
    if (imageUrl.startsWith('http')) {
        const urlObj = new URL(imageUrl);
        imageUrl = urlObj.pathname;
        img = document.querySelector(`img[src="${imageUrl}"]`)
        console.log(imageUrl)
    }
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
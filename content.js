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
    const p = document.createElement('p');
    p.setAttribute('class', 'eyesite');
    image.insertAdjacentElement('afterend', p);
    p.innerHTML = `${alt}`;

    addStyles();
}

function handleImage(imageUrl) {
    const img = document.querySelector(`img[src="${imageUrl}"]`);
    if (img) {
        convertToBase64(img);
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

function convertToBase64(img) {
    if (!img.crossOrigin) {
        img.crossOrigin = 'anonymous';
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    let base64 = dataURL.replace(/^data:image\/(png|jpeg|webp);base64,/, '');
    rek(base64).then((text) => {
        addContent(img, text);
    }).catch(error => {
        console.error("Error processing image: ", error);
    });    
}
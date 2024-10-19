if (typeof data === 'undefined') {
    var data = "placeholder text for testing";
}
async function handleImage(imageUrl) {
    let eyeUrl = new URL(imageUrl);
    let pathnameWithoutExtension = eyeUrl.pathname.replace(/\.[^/.]+$/, '');

    var img = Array.from(document.querySelectorAll('img')).find(image => image.src.includes(pathnameWithoutExtension));

    if (img) {
        try {
            const base64 = await convertToBase64(img);
            const lines = await rek(base64);
            addContent(img, lines)
        } catch (error) {
            console.error('Error converting image to Base64:', error);
        }
    } else {
        console.log(`No image found with pathname: ${pathnameWithoutExtension}`);
    }
}


function convertToBase64(img) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const base64Image = canvas.toDataURL();

        resolve(base64Image);
    });
}

async function rek(base64) {
    const response = await fetch('https://ckgqos29n6.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "base64_image": base64
        })
    });

    const responseData = await response.json();
    const parsedData = JSON.parse(responseData.body);
    console.log(parsedData);

    const lines = parsedData.lines;
    const ocrText = lines.join(' ')
    console.log(ocrText)
    console.log(lines);
    return ocrText;
}



function addContent(image, data) {
    const alt = image.getAttribute('alt') || data;

    const div = document.createElement('div')
    div.setAttribute('class', 'eyesite')

    // const img = document.createElement('img')
    // img.setAttribute('src', 'EyeSite_yellow_transparent.png')
    // img.setAttribute('alt', '')

    const p = document.createElement('p')
    
    // div.appendChild(img)
    div.appendChild(p)

    image.insertAdjacentElement('afterend', div)
    p.innerHTML = `${alt}`

    addStyles()
}

function addStyles() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('eyesite.css');
    style.id = 'eyesite-style';
    document.head.appendChild(style);
}


/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
const rectMinSize = 10;
const rectMidSize = 15;
const rectMaxSize = 20;
let textBounce = 10;
const baseBackgroundColor = {
    hex: '#EEEEEE',
    variation: 64,
    get rgb() {
        return hexToRgb(baseBackgroundColor.hex);
    }
};
const baseTextColor = {
    hex: '#111111',
    variation: 64,
    get rgb() {
        return hexToRgb(baseTextColor.hex);
    }
};
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function drawMultipleRects(ammount = 1000) {
    for (let i = 0; i < ammount; i++) {
        drawRect();
    }
}
function drawRect() {
    const c = baseBackgroundColor.rgb;
    const v = Math.round((Math.random() -0.5) * baseBackgroundColor.variation);
    c.r += v;
    c.g += v;
    c.b += v;
    if (c.r > 255) {
        c.r = 255;
    } else if (c.r < 0) {
        c.r = 0;
    }
    if (c.g > 255) {
        c.g = 255;
    } else if (c.g < 0) {
        c.g = 0;
    }
    if (c.b > 255) {
        c.b = 255;
    } else if (c.b < 0) {
        c.b = 0;
    }
    ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;

    // const b = 255 - Math.round(Math.random() * 64);
    // ctx.fillStyle = `rgb(${b},${b},${b})`;
    const x = Math.round((Math.random() * (canvas.width + rectMinSize)) - rectMinSize);
    const y = Math.round((Math.random() * (canvas.height + rectMinSize)) - rectMinSize);
    const s = Math.round((Math.random() * (rectMaxSize - rectMinSize)) + rectMinSize);
    ctx.fillRect(x, y, s, s);
    // ctx.strokeRect(x, y, s, s);
}

function drawRectText() {
    // ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#FFFFFF';
    const bounceX = Math.round(Math.random() * textBounce);
    const bounceY = Math.round(Math.random() * textBounce);
    const offsetX = 10 + bounceX;
    const offsetY = 10 + bounceY;
    for (let i = 0; i < text.length; i++) {
        const textLetter = text[i];
        let letterArray = letters[textLetter.toUpperCase()];
        if (letterArray == null) {
            letterArray = letters[' '];
        }
        for(let j = 0; j < letterArray.length; j++) {
            if (letterArray[j]) {//if is black draw rect
                const c = baseTextColor.rgb;
                const v = Math.round((Math.random() -0.5) * baseTextColor.variation);
                c.r += v;
                c.g += v;
                c.b += v;
                if (c.r > 255) {
                    c.r = 255;
                } else if (c.r < 0) {
                    c.r = 0;
                }
                if (c.g > 255) {
                    c.g = 255;
                } else if (c.g < 0) {
                    c.g = 0;
                }
                if (c.b > 255) {
                    c.b = 255;
                } else if (c.b < 0) {
                    c.b = 0;
                }
                ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
                // const b = Math.round(Math.random() * 16);
                // ctx.fillStyle = `rgb(${b},${b},${b})`;
                const x = j % letters._width;
                const y = Math.floor(j / letters._width);
                let xPos = offsetX + (i * rectMaxSize * letters._width) + (x * rectMaxSize);
                let yPos = offsetY + (y * rectMaxSize);
                
                while(xPos > canvas.width) {
                    xPos -= canvas.width;
                    yPos += rectMaxSize * (letters._height + 1);
                }
                // const xPos = x * rectMaxSize;
                // const yPos = y * rectMaxSize;
                const s = Math.round((Math.random() * (rectMaxSize - rectMinSize)) + rectMinSize);
                // const s = rectMaxSize;
                ctx.fillRect(xPos, yPos, s, s);
                // ctx.strokeRect(xPos, yPos, s, s);
            }
        }
    }
}
const bRect = canvas.getBoundingClientRect();
canvas.width = bRect.width;
canvas.height = bRect.height;

const drawTimeInterwal = 100;
let drawTimeElapsed = 0;
let previousTime = 0;

let text = 'Glitch Text';
function loop(time) {
    const bRect = canvas.getBoundingClientRect();
    if (canvas.width != bRect.width || canvas.height != bRect.height) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = bRect.width;
        canvas.height = bRect.height;
        ctx.putImageData(imgData, 0, 0);
    }
    const dTime = time - previousTime;
    previousTime = time;
    drawTimeElapsed += dTime;
    if (drawTimeElapsed >= drawTimeInterwal) {
        drawTimeElapsed = 0;
        // ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        drawMultipleRects();
        if (letters._loaded) {
            drawRectText();
        } else {
            ctx.fillStyle = '#000000';
            ctx.font = '100px sans-serif';
            ctx.fillText(text, 100, 100);
        }
    }
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

//config script
const inputText = document.getElementById('inp-text');
const inputBackgroundColor = document.getElementById('inp-bg-color');
const inputTextColor = document.getElementById('inp-text-color');
console.log(new URL(location.href).searchParams.has('text'));
const url = new URL(location.href);

if (url.searchParams.has('text')) {
    text = url.searchParams.get('text');
}
inputText.value = text;
inputText.oninput = function(){text = inputText.value; url.searchParams.set('text', text); history.replaceState('', document.title, url)};

if (url.searchParams.has('bg')) {
    baseBackgroundColor.hex = url.searchParams.get('bg');
}
ctx.fillStyle = baseBackgroundColor.hex;
ctx.fillRect(0, 0, canvas.width, canvas.height);
inputBackgroundColor.value = baseBackgroundColor.hex;
inputBackgroundColor.oninput = function(){baseBackgroundColor.hex = inputBackgroundColor.value; url.searchParams.set('bg', baseBackgroundColor.hex); history.replaceState('', document.title, url)};

if (url.searchParams.has('color')) {
    baseTextColor.hex = url.searchParams.get('color');
}
inputTextColor.value = baseTextColor.hex;
inputTextColor.oninput = function(){baseTextColor.hex = inputTextColor.value; url.searchParams.set('color', baseTextColor.hex); history.replaceState('', document.title, url)};


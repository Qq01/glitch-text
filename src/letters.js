(function(){
    const canvas = document.createElement('canvas');
    // document.body.appendChild(canvas);
    // canvas.style.zIndex = 100;
    // canvas.style.backgroundColor = 'red';
    // canvas.style.border = '1px solid red';
    // canvas.style.position = 'fixed';
    // canvas.style.right = '0px';
    // canvas.style.bottom = '0px';
    // canvas.style.width = '100px';
    // canvas.style.height = '100px';
    // canvas.style.imageRendering = 'pixelated';
    const ctx = canvas.getContext('2d');
    const lettersImage = new Image();
    const letters = {};
    window.letters = letters;
    const width = 6;//5 + 1 empty space for easier iteration
    const height = 5;
    letters._width = width;
    letters._height = height;
    letters[' '] = [
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
    ];//space
    letters._loaded = false;
    const letterList = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';

    function getPixelAt(img, x, y) {
        const start = img.width * y + x;
        const end = start + 4;
        return img.data.slice(start, end);
    }

    function isBlack(img, x, y) {
        const [r] = getPixelAt(img, x, y);
        return r > 128 ? 0 : 1;
    }
    function convertImage(img) {
        const data = [];
        for (let i = 0; i < img.data.length; i += 4) {
            if (img.data[i] > 128) {
                data.push(0);
            } else {
                data.push(1);
            }
        }
        return data;
    }

    lettersImage.onload = function() {
        canvas.width = width;
        canvas.height = height;
        for (let i = 0; i < letterList.length; i++) {
            const letter = letterList[i];
            ctx.drawImage(lettersImage, width * i, 0, width, height, 0, 0, width, height);
            const imgData = ctx.getImageData(0, 0, width, height);
            letters[letter] = convertImage(imgData);
        }
        // canvas.width = lettersImage.width;
        // canvas.height = lettersImage.height;
        // ctx.drawImage(lettersImage, 0, 0, lettersImage.width, lettersImage.height);
        // const imgData = ctx.getImageData(0, 0, lettersImage.width, lettersImage.height);
        // for (let i = 0; i < letterList.length; i++) {
        //     const letter = letterList[i];
        //     letters[letter] = [];
        //     let letterArrayIndex = 0;
        //     for (let col = 0; col < height; col++) {
        //         for (let row = 0; row < width; row++) {
        //             letters[letter][letterArrayIndex] = isBlack(imgData, row + width * i, col);
        //             letterArrayIndex++;
        //         }
        //     }
        // }
        letters._loaded = true;
    };
    lettersImage.src = './src/letters.png';
})();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const defaultFile = document.getElementById("default-file");
const upload = document.getElementById("upload");
let inspectorElement = document.getElementById("inspector");
let bucketElement = document.getElementById("bucket");

console.log(window.innerWidth)

let width = canvas.width = window.innerWidth - 35;
let height = canvas.height = window.innerHeight - 2;
let pressing = false;
let bucket = false;
let value = 10;
let inspector = false;

let imageData = ctx.getImageData(0, 0, width, height);

// Inspector

let toggleInspector = function () {
    inspector = (inspector ? false : true);
    inspectorElement.style.backgroundColor = (inspector ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)')
    console.log('inspector: ', inspector);
}

//bucket

let toggleBucket = function () {
    bucket = (bucket ? false : true);
    bucketElement.style.backgroundColor = (bucket ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)')
    console.log('bucket: ', bucket);
}

// Event Listeners

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth - 35;
    height = canvas.height = window.innerHeight - 2;
})

canvas.addEventListener('mousedown', (e) => {
    if (inspector) {
        checkColor(e);
    } else if (bucket) {
        ctx.beginPath();
        ctx.arc(e.x - 1, e.y - 1, 1, 0, Math.PI * 2);
        ctx.fill();
        let imgData = ctx.getImageData(e.x - 1, e.y - 1, 1, 1)
        floodFill(e.x, e.y, imgData);
    } else {
        draw(e.x, e.y, value);
        pressing = true;
    }
})

canvas.addEventListener('mouseup', e => {
    pressing = false;
})

canvas.addEventListener('mousemove', (event) => {
    if (pressing == true) draw(event.x, event.y, value);
})

// Main Draw

let draw = function (x, y, value) {
    ctx.beginPath();
    ctx.arc(x - 35, y - 2, value, 0, Math.PI * 2);
    ctx.fill();
    imageData = ctx.getImageData(0, 0, width, height);
}

// Color Selectors

let color = function (c) {
    ctx.globalCompositeOperation = 'source-over';
    console.log(c);
    ctx.fillStyle = c;
}

let custom = function () {
    let customColor = prompt('Custom Color: ');
    ctx.fillStyle = customColor;
}

let checkColor = function (event) {
    let x = event.x - 50;
    let y = event.y - 2;
    let pixelColor = [];
    imageData = ctx.getImageData(0, 0, width, height);
    pixelColor['red'] = imageData.data[((y*(imageData.width*4)) + (x*4)) + 0];
    pixelColor['green'] = imageData.data[((y*(imageData.width*4)) + (x*4)) + 1];
    pixelColor['blue'] = imageData.data[((y*(imageData.width*4)) + (x*4)) + 2];
    pixelColor['alpha'] = imageData.data[((y*(imageData.width*4)) + (x*4)) + 3];
    console.log(pixelColor);
}

// Operations

let clr = function() {
    ctx.globalCompositeOperation = 'destination-out';
}

let brushSize = function (val) {
    value = parseInt(val) * 5
}

let clrscr = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// File Handling

function downloadCanvas(link, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
}

let openImage = function(path) {
    const img = new Image();
    img.src = path;
    img.onload = () => { ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);};
    console.log('open');
}

// File Upload using event listener

defaultFile.addEventListener("change", function () {
  const files = defaultFile.files[0]; //files[0] - For getting first file

  if (files) {
    //Read File
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);

    fileReader.addEventListener("load", function () {
      // convert image to base64 encoded string
      openImage(this.result);
    });
  }
});

// FloodFill or bucket tool

let floodFill = function ( i, j, imgData) {
    let rows = width;
    let cols = height;
    let seconds = new Date().getTime();
    
    oldColor = Array.from(ctx.getImageData(i, j, 1, 1).data).toString();
    newColor = Array.from(imgData).toString();
    if (oldColor === newColor) return;

    let que = [];
    que.push([i,j]);

    while (que.length > 0) {
        cords = que.shift()
        i = cords[0], j = cords[1];
        if ( i < 0 || i >= rows || j < 0 || j >= cols || Array.from(ctx.getImageData(i, j, 1, 1).data).toString() != oldColor) continue;
        else {
            ctx.putImageData(imgData, i, j);
            que.push([i+1 ,j ]);
            que.push([i-1 ,j ]);
            que.push([i ,j+1 ]);
            que.push([i ,j-1 ]);
        }
    }
    seconds = new Date().getTime() - seconds;
    console.log('Filled in:', seconds,'milli seconds');
}
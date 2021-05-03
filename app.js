const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

console.log(window.innerWidth)

let width = canvas.width = window.innerWidth - 35;
let height = canvas.height = window.innerHeight - 2;
let pressing = false;
let value = 10;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth - 35;
    height = canvas.height = window.innerHeight - 2;
})

canvas.addEventListener('mousedown', (e) => {
    draw(e.x, e.y, value);
    pressing = true;
})

canvas.addEventListener('mouseup', e => {
    pressing = false;
})

canvas.addEventListener('mousemove', (event) => {
    if (pressing == true) draw(event.x, event.y, value);
})

let draw = function (x, y, value) {
    ctx.beginPath();
    ctx.arc(x - 35, y - 2, value, 0, Math.PI * 2);
    ctx.fill();
}

let color = function (c) {
    console.log(c)
    ctx.fillStyle = c;
}

let custom = function () {
    let customColor = prompt('Custom Color: ');
    ctx.fillStyle = customColor;
}

let brushSize = function (val) {
    value = parseInt(val) * 5
}

let clrscr = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas(link, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
}
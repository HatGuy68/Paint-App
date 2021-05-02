const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

console.log(window.innerWidth)

let width = canvas.width = window.innerWidth - 35;
let height = canvas.height = window.innerHeight - 2;
let pressing = false;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth - 35;
    height = canvas.height = window.innerHeight - 2;
})

canvas.addEventListener('mousedown', (e) => {
    draw(e.x, e.y);
    pressing = true;
})

canvas.addEventListener('mouseup', e => {
    pressing = false;
})

canvas.addEventListener('mousemove', (event) => {
    if (pressing == true) draw(event.x, event.y);
})

let draw = function (x, y) {
    ctx.beginPath();
    ctx.arc(x - 35, y - 2, 10, 0, Math.PI * 2);
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

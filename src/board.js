const Tools = ["brush","rubber","color","clear"];

for(let tool of Tools){
    if(tool == "color"){
        tools.innerHTML += `
        <input type="color" id="color-toggler">
        <li class="tool-space"><button class="tool ${tool}"><label for="color-toggler"><img src="./../public/image/${tool}.png" width="50px"></label></button></li>
        `
    }
    else{
        tools.innerHTML += `
        <li class="tool-space"><button class="tool ${tool}"><img src="./../public/image/${tool}.png" width="50px" id="${tool}"></button></li>
        `
    }
}

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 10;
let startX;
let startY;

tools.addEventListener("click", e => {
    switch(e.target.id){
        case "clear":
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
        case "rubber":
            ctx.strokeStyle = "white"
            break;
        case "brush":
            ctx.strokeStyle = "black"
            break;
    }
});

tools.addEventListener("change", e =>{
    ctx.strokeStyle = e.target.value;
    console.log(e.target.value)
})

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousemove', e => {
    if(isPainting){
        console.log(e.clientX,e.clientY,ctx.strokeStyle)
    }
});
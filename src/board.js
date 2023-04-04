const version = 1;

const Tools = ["brush","rubber","color","clear"];
let NowData = "";

for(let tool of Tools){
    if(tool == "color"){
        tools.innerHTML += `
        <input type="color" id="color-toggler">
        <li class="tool-space"><button class="tool ${tool}"><label for="color-toggler"><img src="./public/image/${tool}.png" width="50px"></label></button></li>
        `
    }else{
        tools.innerHTML += `
        <li class="tool-space"><button class="tool ${tool}"><img src="./public/image/${tool}.png" width="50px" id="${tool}"></button></li>
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
            NowData = "";
            draw_password();
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
})

//change words into painting
function draw_password(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);ctx.clearRect(0, 0, canvas.width, canvas.height);
    // main draw
    for(one_line of NowData.split("$")){
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        // x,y,color
        startX = one_line.split("|")[0].split(",")[0];
        startY = one_line.split("|")[0].split(",")[1];
        ctx.strokeStyle = one_line.split("|")[0].split(",")[2];
        // draw this line
        for(i of one_line.split("|")){
            ctx.strokeStyle = i.split(",")[2];
            ctx.lineTo(i.split(",")[0], i.split(",")[1]);
            ctx.stroke();
        }
    }
}

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    NowData += `|${e.clientX},${e.clientY},${ctx.strokeStyle}`

    draw_password()
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    //start $
    if(NowData.length === 0){
        NowData += `${e.clientX},${e.clientY},${ctx.strokeStyle}`
    }else{
        NowData += `$${e.clientX},${e.clientY},${ctx.strokeStyle}`
    }
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
});

canvas.addEventListener('mousemove', draw);

//mobile phone control
canvas.body.addEventListener("touchstart", (e)=> {
    isPainting = true;
    //start $
    if(NowData.length === 0){
        NowData += `${e.clientX},${e.clientY},${ctx.strokeStyle}`
    }else{
        NowData += `$${e.clientX},${e.clientY},${ctx.strokeStyle}`
    }
}, false);

canvas.body.addEventListener("touchend", (e) => {
    isPainting = false;
}, false);

canvas.body.addEventListener("touchmove", draw);

console.log(version);

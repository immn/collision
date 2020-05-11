import Rect from './classes/Rect.js'
import Vector from './classes/Vector.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

const target = new Vector();
canvas.addEventListener('mousemove', ({offsetX, offsetY}) => {
    target.x = offsetX;
    target.y = offsetY;
})

const boxs = Array.from(Array(50), () => {
    const rect = new Rect(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(Math.random() * 16 + 40),
        Math.floor(Math.random() * 16 + 32));

        const temp = Math.floor(Math.random()*6)*8+120;
        rect.color = 'rgba(' + temp + ',' + temp + ',' + temp +', .1)';
    return (rect);
})

const logo = [
    '0000000000000000',
    '0222222222222220',
    '0200000000000020',
    '0200000000000020',
    '0200110000110020',
    '0200000000000020',
    '0200000000000020',
    '0200000000000020',
    '0200111111110020',
    '0200000000000020',
    '0200000000000020',
    '0200000000000020',
    '0200000000000020',
    '0200000000000020',
    '0222222222222220',
    '0000000000000000'
];

logo.forEach((str, y) => {
    for (let x = str.length;x--;){
        const rect = new Rect(
            canvas.width / 2 - 8 * 16 + x * 16,
            canvas.height / 2 - 8 * 16 + y * 16,
            16,
            16
            );
    
            const temp = Math.floor(Math.random()*6)*8;
            if (str[x] === '1'){
                rect.color = 'rgba(' + 255 + ',' + 255 + ',' + 255 +', 1)';
            }else if (str[x] === '0'){
                rect.color = 'rgba(' + temp + ',' + temp + ',' + temp +', .8)';
            }else{
                rect.color = 'rgba(' + 0 + ',' + 0 + ',' + 0 +', .8)';
            }
            
        boxs.push (rect);
    }

})
// const player = new Rect(
//     Math.floor(Math.random() * canvas.width),
//     Math.floor(Math.random() * canvas.height),
//     Math.floor(Math.random() * 8 + 32),
//     Math.floor(Math.random() * 8 + 32)
// );
const players = Array.from(Array(500), () => {
    const r = Math.random() * 8 + 2;
    const rect = new Rect(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.floor(r + 2),
        Math.floor(r + 2)
    );
    return rect;
})

function overlap(box, object){
    return object.right > box.left &&
    object.left < box.right &&
    object.top < box.bottom &&
    object.bottom > box.top;
}

function intersection(object, index, cb){
    players.filter((box, i) => index !== i && overlap(box, object)).forEach(cb)
    boxs.filter(box => overlap(box, object)).forEach(cb);
}

function move(object, index, vx, vy){
    object.x += vx; //velocity
    if (vx > 0){
        intersection(object, index, (box)=>{
            if (object.right > box.left){
                object.right = box.left;
            }
        })
    } else if (vx < 0){
        intersection(object, index, (box)=>{
            if (object.left < box.right){
                object.left = box.right;
            }
        })
    }

    object.y += vy;//velocity
    if (vy > 0){
        intersection(object, index, (box)=>{
            if (object.bottom > box.top){
                object.bottom = box.top;
            }
        })
    } else if (vy < 0){
        intersection(object, index, (box)=>{
            if (object.top < box.bottom){
                object.top = box.bottom;
            }
        })
    }
}

function draw(){
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    boxs.forEach(box => {
        context.fillStyle = box.color;
        context.fillRect(box.x, box.y, box.w, box.h);
    })

    context.fillStyle = 'lime';

    players.forEach(player => {
        context.fillRect(player.x, player.y, player.w, player.h);
    })
    
}

function update(){

    //new
    players.forEach((player, index) => {
        const moveTo = new Vector(target.x - player.x, target.y - player.y)
        if (moveTo.len > 1)
        {
            moveTo.len /= (player.weight*2);
            move(player, index, moveTo.x, moveTo.y);
        }
    })
    //

    
    draw();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

draw();
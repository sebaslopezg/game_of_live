//createScreen(1000,20,"#d8d8d8")
const startButton = document.querySelector('#start')
const falseColor = '#d8d8d8'
const trueColor = '#000'
const pixelSize = 20
fillScreen(pixelSize, falseColor)

startButton.addEventListener('click', ()=> {
    executeRules()
})

document.addEventListener('click', (e) => {
    let isPixel = e.target.classList[0] == 'pixel'
    if (isPixel) {
        const element = e.target
        if (element.dataset.state == 'true') {
            element.setAttribute("data-state", "false")
            element.style.backgroundColor = falseColor  
        }else{
            element.setAttribute("data-state", "true")
            element.style.backgroundColor = trueColor
        }
    }
})

function createScreen(numberOfPixels,sizeOfPixels,color){
    const screen = document.createElement("div");
    screen.setAttribute('class','screen')

    for (let i = 0; i < numberOfPixels; i++) {
        const pixel = document.createElement("div");

        pixel.style.height = sizeOfPixels+'px'
        pixel.style.width = sizeOfPixels+'px'
        pixel.style.backgroundColor = color

        pixel.setAttribute("id", i)
        pixel.setAttribute("class", "pixel")
        pixel.setAttribute("data-state", "false")
        screen.appendChild(pixel)
        
    }
    document.body.appendChild(screen);
}

//Crear divs row y dentro de los mismos crear los pixels
function fillScreen(sizeOfPixels, color) {
    const screenWidth = window.innerWidth //window.innerWidth;
    const screenHeight = window.innerHeight;
    const cols = Math.ceil(screenWidth / sizeOfPixels);
    const rows = Math.ceil(screenHeight / sizeOfPixels);
    const totalPixels = cols * rows;

    const screen = document.createElement("div");
    screen.setAttribute('class','screen')

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.setAttribute('class','row')
        row.setAttribute('id',i)     
        for (let j = 0; j < cols-2; j++) {
            const pixel = document.createElement("div");
    
            pixel.style.height = sizeOfPixels+'px'
            pixel.style.width = sizeOfPixels+'px'
            pixel.style.backgroundColor = color
    
            pixel.setAttribute("id", j)
            pixel.setAttribute("class", "pixel")
            pixel.setAttribute("data-state", "false")
            pixel.setAttribute("data-row", i)
            row.appendChild(pixel)
            
        }
        screen.appendChild(row)
    }
    document.body.appendChild(screen);
    //createScreen(totalPixels, sizeOfPixels, color);
}

function executeRules(){
    let cuadros = document.querySelectorAll('.pixel')
    cuadros.forEach(cuadro =>{
        //console.log(cuadro.dataset.state)
        if (cuadro.dataset.state == 'true') {
            console.log(cuadro.id)
            getBottom(cuadro.id)
        }
    })
}

function getTop(id){

}
function getBottom(id){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cols = Math.ceil(screenWidth / pixelSize);
    const rows = Math.ceil(screenHeight / pixelSize);
    //let pixelBottomId = parseInt(id) - 1 // getLeft
    //let pixelBottomId = parseInt(id) + 1 // getRight
    let pixelBottomId = parseInt(id)  // getTop
    let pixelBottom = document.getElementById(pixelBottomId)
    pixelBottom.style.backgroundColor = "red"
    console.log('id:' + id)
    console.log('Cols:' + cols)
    console.log('rows' + rows)
    console.log('Pixel bottom id:' + pixelBottomId)
    console.log(pixelBottom)
}

function getLeft(id){
}

function getRight(id){
}

function getCornerTopRight(id){
}

function getCornerTopLeft(id){
}

function getCornerBottomRight(id){
}

function getCornerBottomLeft(id){
}

let secondsPassed;
let oldTimeStamp;
let fps;

gameLoop()

function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    //console.log('FPS:' + fps)

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

const startButton = document.querySelector('#start')
const falseColor = '#d8d8d8'
const trueColor = '#000'
const pixelSize = 20
fillScreen(pixelSize, falseColor)

addEventListener("resize", (e) => {
    fillScreen(pixelSize, falseColor)
})

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

//Crear divs row y dentro de los mismos crear los pixels
function fillScreen(sizeOfPixels, color) {
    const screenWidth = window.innerWidth //window.innerWidth;
    const screenHeight = window.innerHeight
    const cols = Math.ceil(screenWidth / sizeOfPixels)
    const rows = Math.ceil(screenHeight / sizeOfPixels)

    let screenExist = document.getElementById("screen")
    let screenElement

    if (screenExist) {
        screenElement = screenExist
    }else{
        screenElement = document.createElement('div')
        screenElement.setAttribute('class','screen')
        screenElement.setAttribute('id','screen')
    }

    const screen = screenElement
    screen.innerHTML = ''

    let pixelIdCounter = 0;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.setAttribute('class','row')
        row.setAttribute('id',i)    
        for (let j = 0; j < cols-2; j++) {
            const pixel = document.createElement("div");
    
            pixel.style.height = sizeOfPixels+'px'
            pixel.style.width = sizeOfPixels+'px'
            pixel.style.backgroundColor = color
    
            pixel.setAttribute("data-row-id", j)
            pixel.setAttribute("id", pixelIdCounter)
            pixel.setAttribute("class", "pixel")
            pixel.setAttribute("data-state", "false")
            pixel.setAttribute("data-row", i)
            row.appendChild(pixel)
            pixelIdCounter++
        }
        screen.appendChild(row)
    }
    document.body.appendChild(screen);
    //createScreen(totalPixels, sizeOfPixels, color);
}

function executeRules(){
    let cuadros = document.querySelectorAll('.pixel')
    cuadros.forEach(cuadro =>{
        if (cuadro.dataset.state == 'true') {
            getTop(cuadro.id)
            getLeft(cuadro.id)
            getRight(cuadro.id)
            getBottom(cuadro.id)
            getCornerTopRight(cuadro.id)
            getCornerTopLeft(cuadro.id)
            getCornerBottomRight(cuadro.id)
            getCornerBottomLeft(cuadro.id)
        }
    })
}

function getTop(id){
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row - 1
    let pixel = cuadro.dataset.rowId
    getPixel(row, pixel)
}
function getBottom(id){
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let pixel = cuadro.dataset.rowId
    getPixel(row, pixel)
}

function getLeft(id){
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row
    let pixel = cuadro.dataset.rowId - 1
    getPixel(row, pixel)
}

function getRight(id){
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row
    let pixel = parseInt(cuadro.dataset.rowId) + 1
    getPixel(row, pixel)
}

function getCornerTopRight(id){
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) - 1
    let pixel = parseInt(cuadro.dataset.rowId) + 1
    getPixel(row, pixel)
}

function getCornerTopLeft(id){
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) - 1
    let pixel = parseInt(cuadro.dataset.rowId) - 1
    getPixel(row, pixel)
}

function getCornerBottomRight(id){
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let pixel = parseInt(cuadro.dataset.rowId) + 1
    getPixel(row, pixel)
}

function getCornerBottomLeft(id){
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let pixel = parseInt(cuadro.dataset.rowId) - 1
    getPixel(row, pixel)
}

function getPixel(row, pixel){
    let idPixel = pixel
    let cuadros = document.querySelectorAll('.pixel')
    cuadros.forEach(pixel =>{
        if (pixel) {
            let matchRow = pixel.dataset.row == row
            let matchPixel = pixel.dataset.rowId == idPixel
            if (matchRow && matchPixel) {
                pixel.style.backgroundColor = 'red'
            }
        }
    })
}

let secondsPassed;
let oldTimeStamp;
let fps;

//activa el loop infinito del juego
//gameLoop()

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
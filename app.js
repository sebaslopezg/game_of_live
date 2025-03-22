
const startButton = document.querySelector('#start')
const nextButton = document.querySelector('#next')
const stopButton = document.querySelector('#stop')
const falseColor = '#d8d8d8'
const trueColor = '#000'
const pixelSize = 20
let executionState = false

let arroundCells = {
    top:null,
    bottom:null,
    left:null,
    right:null,
    CornerTopRight:null,
    CornerTopLeft:null,
    CornerBottomRight:null,
    CornerBottomLeft:null,
}

fillScreen(pixelSize, falseColor)

addEventListener("resize", (e) => {
    fillScreen(pixelSize, falseColor)
})

startButton.addEventListener('click', ()=> {
    startExecution()
})
nextButton.addEventListener('click', ()=> {
    executeRules()
})
stopButton.addEventListener('click', ()=> {
    stopExecution()
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
            element.style.backgroundColor = getRandomColor()
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
        for (let j = 0; j < cols-7; j++) {
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
        let count = 0
        if (cuadro.dataset.state == 'true') {
            setNull(arroundCells)
            count = countNeighborsPixels(cuadro.id)
            if (count > 3) {
                cuadro.setAttribute("data-state", "false")
                cuadro.style.backgroundColor = falseColor
            }else if(count < 2){
                cuadro.setAttribute("data-state", "false")
                cuadro.style.backgroundColor = falseColor
            }

            Object.entries(arroundCells).forEach(prop =>{
                cellIsNull = prop[1] == null
                cell = prop[1]
                if (!cellIsNull) {
                    count = countNeighborsPixels(cell.id)
                    if (count == 3) {
                        cell.setAttribute("data-state", "true")
                        cell.style.backgroundColor = getRandomColor()
                    }
                }
            })
        }
    })
}

function countNeighborsPixels(pixelId){
    let count = 0

    getTop(pixelId) == 'true' ? count++ : ''
    getLeft(pixelId) == 'true' ? count++ : ''
    getRight(pixelId) == 'true' ? count++ : ''
    getBottom(pixelId) == 'true' ? count++ : ''
    getCornerTopRight(pixelId) == 'true' ? count++ : ''
    getCornerTopLeft(pixelId) == 'true' ? count++ : ''
    getCornerBottomRight(pixelId) == 'true' ? count++ : ''
    getCornerBottomLeft(pixelId) == 'true' ? count++ : ''

    return count
}

function getTop(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row - 1
    let cell = cuadro.dataset.rowId
    let pixel = getPixel(row, cell)
    arroundCells.top = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}
function getBottom(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let cell = cuadro.dataset.rowId
    let pixel = getPixel(row, cell)
    arroundCells.bottom = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getLeft(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row
    let cell = cuadro.dataset.rowId - 1
    let pixel = getPixel(row, cell)
    arroundCells.left = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getRight(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = cuadro.dataset.row
    let cell = parseInt(cuadro.dataset.rowId) + 1
    let pixel = getPixel(row, cell)
    arroundCells.right = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getCornerTopRight(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) - 1
    let cell = parseInt(cuadro.dataset.rowId) + 1
    let pixel = getPixel(row, cell)
    arroundCells.CornerTopRight = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getCornerTopLeft(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) - 1
    let cell = parseInt(cuadro.dataset.rowId) - 1
    let pixel = getPixel(row, cell)
    arroundCells.CornerTopLeft = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getCornerBottomRight(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let cell = parseInt(cuadro.dataset.rowId) + 1
    let pixel = getPixel(row, cell)
    arroundCells.CornerBottomRight = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getCornerBottomLeft(id){
    let respuesta
    const cuadro = document.getElementById(id)
    let row = parseInt(cuadro.dataset.row) + 1
    let cell = parseInt(cuadro.dataset.rowId) - 1
    let pixel = getPixel(row, cell)
    arroundCells.CornerTopLeft = pixel
    if (pixel) {
        respuesta = pixel.dataset.state
    }
    return respuesta
}

function getPixel(row, pixel){
    let respuesta
    let idPixel = pixel
    let cuadros = document.querySelectorAll('.pixel')
    cuadros.forEach(pixel =>{
        if (pixel) {
            let matchRow = pixel.dataset.row == row
            let matchPixel = pixel.dataset.rowId == idPixel
            if (matchRow && matchPixel) {
                //pixel.style.backgroundColor = 'red'
                respuesta = pixel
            }
        }
    })
    return respuesta
}

function setNull(obj){
    Object.entries(obj).forEach((key) =>{
        obj[key[0]] = null
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

let secondsPassed;
let oldTimeStamp;
let fps;

//activa el loop infinito del juego
function startExecution(){
    executionState = true
    gameLoop()
}

function stopExecution(){
    executionState = false
}

function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    executeRules()

    // Draw number to the screen
    //console.log('FPS:' + fps)

    // The loop function has reached it's end. Keep requesting new frames
    if (executionState) {
        window.requestAnimationFrame(gameLoop);
    }
}
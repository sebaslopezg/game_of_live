
const startButton = document.querySelector('#start')
const nextButton = document.querySelector('#next')
const stopButton = document.querySelector('#stop')
const fpsCounter = document.querySelector('#fpsCounter')
let secondsPassed;
let oldTimeStamp;
let fps;

let executionState = false
let nextAliveCells = []
let nextDiedCells = []
let activePixels = []

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

startButton.addEventListener('click', ()=> {
    startExecution()
})
nextButton.addEventListener('click', ()=> {
    executeRules()
    setCells()
})
stopButton.addEventListener('click', ()=> {
    stopExecution()
    fpsCounter.innerHTML = 0
})

document.addEventListener('click', (e) => {
    let isPixel = e.target.classList[0] == 'pixel'
    if (isPixel) {
        const element = e.target
        if (element.dataset.state == 'true') {
            //activePixels.push(element.id)
            let arrIndex = activePixels.indexOf(element.id)
            if (arrIndex > -1) {
                activePixels.splice(arrIndex, 1);
            }
            element.setAttribute("data-state", "false")
            element.style.backgroundColor = falseColor
        }else{
            element.setAttribute("data-state", "true")
            activePixels.push(element.id)
            let cellColor
            isRandomColor ? cellColor = getRandomColor() : cellColor = trueColor
            element.style.backgroundColor = cellColor
        }
    }
})

function executeRules(){

    nextAliveCells = []
    nextDiedCells = []
    let cuadros = []
    activePixels.forEach(pixel => {
        let element = document.getElementById(pixel)
        cuadros.push(element)
    })
    //let cuadros = document.querySelectorAll('.pixel')
    cuadros.forEach(cuadro =>{
        let count = 0
        if (cuadro.dataset.state == 'true') {
            setNull(arroundCells)
            count = countNeighborsPixels(cuadro.id)
            if (count > 3) {
                nextDiedCells.push(cuadro.id)
            }else if(count < 2){
                nextDiedCells.push(cuadro.id)
            }

            Object.entries(arroundCells).forEach(prop =>{
                cellIsNull = prop[1] == null
                cell = prop[1]
                if (!cellIsNull) {
                    count = countNeighborsPixels(cell.id)
                    if (count == 3) {
                        //cell.setAttribute("data-state", "true")
                        //let cellColor
                        //isRandomColor ? cellColor = getRandomColor() : cellColor = trueColor
                        //cell.style.backgroundColor = cellColor
                        nextAliveCells.push(cell.id)
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

function setCells(){

    nextAliveCells.forEach(cellId =>{
        const cell = document.getElementById(cellId)

        cell.setAttribute("data-state", "true")
        activePixels.push(cellId)
        let cellColor
        isRandomColor ? cellColor = getRandomColor() : cellColor = trueColor
        cell.style.backgroundColor = cellColor
    })

    nextDiedCells.forEach(cellId => {
        const cell = document.getElementById(cellId)
        let indexSlice = activePixels.indexOf(cellId)
        activePixels.slice(indexSlice)
        cell.setAttribute("data-state", "false")
        cell.style.backgroundColor = falseColor
    })
}

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
    fpsCounter.innerHTML = fps
    executeRules()
    setCells()

    // Draw number to the screen
    //console.log('FPS:' + fps)

    // The loop function has reached it's end. Keep requesting new frames
    if (executionState) {
        window.requestAnimationFrame(gameLoop);
    }
}


/**
 * 


                <div class="card" style="width: 18rem;" key={post.id}>
                <div class="card-body">
                    <h5 class="card-title">{post.first_name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">id: {post.id}</h6>
                    <p class="card-text">{post.email}</p>
                    <img src={post.avatar} alt="" />
                </div>
                </div>


 */
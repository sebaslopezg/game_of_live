const pixelSize = 20
const falseColor = '#d8d8d8'
const trueColor = '#000'
const isRandomColor = false

function fillScreen(sizeOfPixels, color) {
    const screenWidth = window.innerWidth
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
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

fillScreen(pixelSize, falseColor)

addEventListener("resize", (e) => {
    fillScreen(pixelSize, falseColor)
})
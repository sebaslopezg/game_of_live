createScreen(1000,20,"#d8d8d8")

function createScreen(numberOfPixels,sizeOfPixels,color){

    screen.setAttribute('class','screen')

    for (let i = 0; i < numberOfPixels; i++) {
        const pixel = document.createElement("div");

        pixel.style.height = sizeOfPixels+'px'
        pixel.style.width = sizeOfPixels+'px'
        pixel.style.backgroundColor = color

        pixel.setAttribute("id", i)
        pixel.setAttribute("class", "pixel")
        screen.appendChild(pixel)
        
        document.body.appendChild(screen);
    }
}


//

function createScreen(numberOfPixels, sizeOfPixels, color) {
    // Crear el contenedor de la pantalla si no existe
    let screen = document.createElement("div");
    screen.setAttribute("class", "screen");
    screen.style.display = "flex";
    screen.style.flexWrap = "wrap";
    screen.style.width = Math.sqrt(numberOfPixels) * sizeOfPixels + "px";

    for (let i = 0; i < numberOfPixels; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = sizeOfPixels + "px";
        pixel.style.width = sizeOfPixels + "px";
        pixel.style.backgroundColor = color;
        pixel.setAttribute("id", i);
        pixel.setAttribute("class", "pixel");
        screen.appendChild(pixel);
    }
    
    document.body.appendChild(screen);
}

// Llamar a la función
createScreen(1000, 20, "#d8d8d8");
const $boxElements = document.querySelectorAll('.box')

const colors = ['tomato','crimson','violet','blue','amber','jade','tomato','crimson','violet','blue','amber','jade']

function startGame(){
    randomPaintingBoxElements()
    hiddenBoxElements()
}

startGame()

function randomPaintingBoxElements(){
    $boxElements.forEach((box) => {
        if(box.id.length === 0){
            const colorIndex = colorRandom()
            box.id = colors[colorIndex]
            box.classList.add(colors[colorIndex])
            colors.splice(colorIndex,1)
        } 
    });
}

function colorRandom(){
    const color = Math.floor(Math.random() * colors.length)
    return color
}

function hiddenBoxElements(){
    $boxElements.forEach((box) => {
        box.classList.add('hidden')
    }); 
}




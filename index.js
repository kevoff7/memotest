const $boxElements = document.querySelectorAll('.box')
const $container = document.querySelector('.container')
const $pageWinGame = document.querySelector('#page-win-game')

const colors = ['tomato','crimson','violet','blue','amber','jade','tomato','crimson','violet','blue','amber','jade']

let $firstBox = false
let count = 0;

function startGame(){
    randomPaintingBoxElements($boxElements)
    handleInput($boxElements)
}

startGame()

function randomPaintingBoxElements(boxElements){
    boxElements.forEach((box) => {
        if(box.id.length === 0){
            const colorIndex = colorRandom()
            box.id = colors[colorIndex]
            box.classList.add(colors[colorIndex])
            colors.splice(colorIndex,1)
        } 
    });
}

function handleSequenceGame(e){
    const $boxElement = e.target
    if($boxElement.className.split(' ').includes('completed')) return
    showBoxElement($boxElement)
    if(!$firstBox){
        $firstBox = $boxElement
    }else{
        if($firstBox === $boxElement) return
        count +=1;
        if($firstBox.id === $boxElement.id){
            BoxElementCompleted($firstBox)
            BoxElementCompleted($boxElement)
        }
        else{
            hiddenBoxElement($firstBox)
            hiddenBoxElement($boxElement)
        }
        $firstBox = false;
    }
}

function winGame($boxElements){
    let countBoxCompleted = 0;
    $boxElements.forEach($boxElement => {
        const hasCompleteClass = $boxElement.className.split(' ').includes('completed')
        if(hasCompleteClass){
            countBoxCompleted = countBoxCompleted + 1 
        }
    })
   if(countBoxCompleted === 12){
    showWinnerPage()
   }
}

function showWinnerPage(){
    $container.remove()
    $pageWinGame.style.display = 'block'
    const $newParagraph = document.createElement('p')
    $newParagraph.textContent = `Ganaste!, lo lograste en ${count} intentos. Felicitaciones`
    $newParagraph.className = 'paragraph'
    $pageWinGame.appendChild($newParagraph)
}

function colorRandom(){
    const color = Math.floor(Math.random() * colors.length)
    return color
}

function handleInput($boxElements){
    $boxElements.forEach($box => {
        $box.onclick = handleSequenceGame
    })
}

function BoxElementCompleted(firstBoxElement){
    setTimeout(()=>{
        firstBoxElement.classList.add('completed')
        winGame($boxElements);
    },300)
}

function hiddenBoxElement(boxElement){
    setTimeout(()=>{
        boxElement.classList.remove('show-box')
    },300)
}

function showBoxElement(boxElement){
    boxElement.classList.add('show-box')
}



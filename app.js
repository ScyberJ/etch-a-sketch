let showGridLines = false

// functions
const addCells = (size) => {
    fr = '1fr '
    gridContainer.style.gridTemplateColumns = `${fr.repeat(size)}`
    for (i = 0; i < Math.pow(size, 2); i++) {
        cell = document.createElement('div')
        cell.className = `cell ${showGridLines ? 'grid-lines' : ''}`
        addEvent(cell, 'mouseenter', toggleRandomColor)
        gridContainer.appendChild(cell)
    }
}

const addEvent = (el, type, func) => {
    el.addEventListener(type, func)
}

const toggleRandomColor = (e) => {
    e.currentTarget.style.backgroundColor = `rgb(
    ${Math.random() * 256}, 
    ${Math.random() * 256}, 
    ${Math.random() * 256}
    )`
}

const toggleGridLines = () => {
    showGridLines = !showGridLines
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.toggle('grid-lines')
    })
}

const retileCells = (e) => {
    gridContainer.innerHTML = ''
    addCells(e.target.value)
}

const clearCells = () => {
    document.querySelectorAll('.cell').forEach(cell =>
        cell.style.backgroundColor = 'white')
}


// elements

const boxWidth = 500
const boxHeight = 500
const box = document.createElement('div');
box.style.width = `${boxWidth}px`
box.style.height = `${boxHeight}px`
box.className = 'box'

const gridContainer = document.createElement('div')
gridContainer.className = 'grid-container'

const userControlsContainer = document.createElement('div')
userControlsContainer.className = 'controls-container'

const clear = document.createElement('button')
clear.className = 'clear'
clear.innerText = 'clear'
addEvent(clear, 'click', clearCells)

const cellSizeInput = document.createElement('input')
cellSizeInput.className = 'cell-size-input'
cellSizeInput.type = 'number'
cellSizeInput.placeholder = 'enter how many cells'
cellSizeInput.min = 0
addEvent(cellSizeInput, 'change', retileCells)

const color = document.createElement('input')
color.className = 'color'
color.type = 'number'
color.placeholder = 'enter a hex color'

const toggleButton = document.createElement('button')
toggleButton.className = 'toggle-grid-lines'
toggleButton.innerHTML = 'Toggle Grid lines';
addEvent(toggleButton, 'click', toggleGridLines)


// main
addCells(32)


// appends
userControlsContainer.append(cellSizeInput)
userControlsContainer.append(color)
userControlsContainer.append(toggleButton)
userControlsContainer.append(clear)
box.append(gridContainer);
document.getElementById('root').append(userControlsContainer)
document.getElementById('root').append(box)

console.log('hello')

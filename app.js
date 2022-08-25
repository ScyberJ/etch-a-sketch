let normalModeIsSelected, showGridLines, rainbowModeIsSelected, fadeModeIsSelected = false

let normalModeColor = '#000000'
let backgroundColor = '#ffffff'

// functions
const addCells = (size) => {
    fr = '1fr '
    gridContainer.style.gridTemplateColumns = `${fr.repeat(size)}`
    for (i = 0; i < Math.pow(size, 2); i++) {
        cell = document.createElement('div')
        cell.className = `cell ${showGridLines ? 'grid-lines' : ''}`
        gridContainer.appendChild(cell)
    }
}

const toggleNormalMode = (e) => {
    if (rainbowModeIsSelected) toggleRainbowMode({ currentTarget: rainbowModeToggleButton });

    normalModeIsSelected = !normalModeIsSelected
    e.currentTarget.classList.toggle('selected', normalModeIsSelected)

    if (normalModeIsSelected) {
        queryCellsAndAddEventListenerToEach('mouseenter', assignBgColorToCell)
    } else {
        queryCellsAndRemoveEventListenerFromEach('mouseenter', assignBgColorToCell)
    }
}

const toggleFadeMode = (e) => {
    fadeModeIsSelected = !fadeModeIsSelected
    e.currentTarget.classList.toggle('selected', fadeModeIsSelected)

    if (fadeModeIsSelected) {
        queryCellsAndAddEventListenerToEach('mouseleave', fadeCell)
    } else {
        queryCellsAndRemoveEventListenerFromEach('mouseleave', fadeCell)
    }
}

const toggleRainbowMode = (e) => {
    if (normalModeIsSelected) toggleNormalMode({ currentTarget: normalModeToggleButton });

    rainbowModeIsSelected = !rainbowModeIsSelected
    e.currentTarget.classList.toggle('selected', rainbowModeIsSelected)

    if (rainbowModeIsSelected) {
        queryCellsAndAddEventListenerToEach('mouseenter', assignRandomBgColorToCell)
    } else {
        queryCellsAndRemoveEventListenerFromEach('mouseenter', assignRandomBgColorToCell)
    }
}

const toggleGridLines = (e) => {
    showGridLines = !showGridLines
    e.currentTarget.classList.toggle('selected', showGridLines)
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.toggle('grid-lines')
    })
}

const fadeCell = (e) => {
    const cell = e.currentTarget
    let rgbValuesArray = parseRGBvalueFromCSSstring(cell.style.backgroundColor)

    let fadeTimer = setInterval(() => {
        rgbValuesArray = rgbValuesArray.map(value => valueToBeAddedForDesiredColor(value))
        let [red, green, blue] = rgbValuesArray

        setElementBgColor(cell, createCSSstringRGB(red, green, blue))

        if (rgbValuesArray.every(value => value === 255)) {
            clearInterval(fadeTimer)
        }

    }, 100)
}

const queryCellsAndAddEventListenerToEach = (eventType, eventCallback) => {
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener(eventType, eventCallback))
}

const queryCellsAndRemoveEventListenerFromEach = (eventType, eventCallback) => {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener(eventType, eventCallback))
}

const assignRandomBgColorToCell = (e) => {
    setElementBgColor(e.currentTarget, createCSSstringRGB(Math.random() * 256, Math.random() * 256, Math.random() * 256))

}

const assignBgColorToCell = (e) => {
    let [red, green, blue] = convertHexToRGB(document.querySelector('.color').value)
    setElementBgColor(e.currentTarget, createCSSstringRGB(red, green, blue))
}

const parseRGBvalueFromCSSstring = CSSstring =>
    CSSstring
        .split('')
        .slice(4, CSSstring.length - 1)
        .join('')
        .split(',')
        .map(val => Number(val))

const valueToBeAddedForDesiredColor = (value) => value += Math.ceil((255 - value) * .6)

const convertHexToRGB = hex =>
    hex
        .slice(1)
        .match(/[a-f\d][a-f\d]/g)
        .map(value => parseInt(value, 16))

const setElementBgColor = (element, color) => element.style.backgroundColor = color

const createSingleValuedCSSstringRGB = (color) => createCSSstringRGB(color, color, color)

const createCSSstringRGB = (red, green, blue) =>
    `rgb(
    ${red},
    ${green},
    ${blue}
    )`

const retileCells = (e) => {
    gridContainer.innerHTML = ''
    addCells(e.target.value)
}

const clearCells = () => {
    document.querySelectorAll('.cell').forEach(cell =>
        cell.style.backgroundColor = 'white')
}

const querySelectAllCells = () => document.querySelectorAll('.cell')



// elements

const boxWidth = 500
const boxHeight = 500
const box = document.createElement('div');
box.style.width = `${boxWidth}px`
box.style.height = `${boxHeight}px`
box.className = 'box'

const gridContainer = document.createElement('div')
gridContainer.className = 'grid-container'

const sidePanelContainer = document.createElement('div')
sidePanelContainer.className = 'side-panel-container'

const title = document.createElement('h1')
title.textContent = 'Etch-a-Sketch'
title.className = 'title'

const userControlsContainer = document.createElement('div')
userControlsContainer.className = 'controls-container'

const clear = document.createElement('button')
clear.className = 'clear'
clear.innerText = 'clear'
clear.addEventListener('click', clearCells)

const cellSizeInput = document.createElement('input')
cellSizeInput.className = 'cell-size-input'
cellSizeInput.type = 'number'
cellSizeInput.placeholder = 'enter how many cells'
cellSizeInput.max = 64
cellSizeInput.min = 0
cellSizeInput.addEventListener('change', retileCells)

const color = document.createElement('input')
color.className = 'color'
color.type = 'color'
color.value = normalModeColor


const createToggleButton = (name, toggleFunc) => {
    const toggleButton = document.createElement('button')
    toggleButton.className = `${name.toLowerCase().split(' ').join('-')} toggle-btn`
    toggleButton.innerHTML = name;
    toggleButton.addEventListener('click', toggleFunc)
    return toggleButton
}

const normalModeToggleButton = createToggleButton('Toggle Normal Mode', toggleNormalMode)
const gridLineToggleButton = createToggleButton('Toggle Grid Lines', toggleGridLines)
const rainbowModeToggleButton = createToggleButton('Toggle Rainbow Mode', toggleRainbowMode)
const fadeModeToggleButton = createToggleButton('Toggle Fade Mode', toggleFadeMode)

const normalModeContainer = document.createElement('div')
normalModeContainer.className = 'normalModeContainer'

// main
addCells(32)


// appends
normalModeContainer.append(normalModeToggleButton)
normalModeContainer.append(color)

userControlsContainer.append(cellSizeInput)
userControlsContainer.append(normalModeContainer)
userControlsContainer.append(gridLineToggleButton)
userControlsContainer.append(rainbowModeToggleButton)
userControlsContainer.append(fadeModeToggleButton)
userControlsContainer.append(clear)

box.append(gridContainer);
sidePanelContainer.append(title);
sidePanelContainer.append(userControlsContainer);
document.getElementById('root').append(sidePanelContainer)
document.getElementById('root').append(box)

console.log('hello')

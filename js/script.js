const doc = document

const canvas = doc.querySelector('#canv')
const ctx = canvas.getContext('2d')

const xBlock = doc.querySelector('#x-coord')
const yBlock = doc.querySelector('#y-coord')

let editor = {
    width: canvas.getAttribute('width'),
    height: canvas.getAttribute('height'),
    currentTool: null,
    currentColor: '#000',
    brushSize: 5,
    x: 0,
    y: 0,

    _init() {
        doc.addEventListener('input', this.inputHandler)
        doc.addEventListener('click', this.clickHandler)
        doc.addEventListener('click', this._clear)

        canvas.addEventListener('mousemove', this.getCoordinates)
        canvas.addEventListener('mousedown', this.startEdit)
        canvas.addEventListener('mouseup', this.endEdit)
    },

    inputHandler(evt) {
        let id = evt.target.id
        let val = evt.target.value
        if (id === 'select-color' || id === 'select-size') {
            id === 'select-color' ? editor.currentColor = val : editor.brushSize = val
            if (id === 'select-color') ctx.fillStyle = editor.currentColor
        }
    },
    clickHandler(evt) {
        let el = evt.target
        if (el.name === 'tool-button') {
            editor.currentTool = el.dataset.name
            console.log(editor.currentTool)
        }
    },
    getCoordinates(evt) {
        editor.x = evt.offsetX
        editor.y = evt.offsetY

        xBlock.innerText = editor.x
        yBlock.innerText = editor.y
    },
    startEdit(evt) {
        if (editor.currentTool === 'brush') editor._drawBrush(evt)
        if (editor.currentTool === 'eraser') editor._eraser(evt)
        if (editor.currentTool === 'line') editor._drawLine()
    },
    endEdit() {
        canvas.onmousemove = null
    },
    _drawBrush() {
        canvas.onmousemove = () => {
            ctx.fillRect(editor.x, editor.y, editor.brushSize, editor.brushSize)
        }
    },
    _eraser() {
        canvas.onmousemove = () => {
            ctx.clearRect(editor.x, editor.y, editor.brushSize, editor.brushSize)
        }
    },
    _drawLine() {
        ctx.lineWidth = editor.brushSize
        ctx.strokeStyle = editor.currentColor
        ctx.lineTo(editor.x, editor.y)
        ctx.stroke()
    },
    _clear() {
        if (editor.currentTool === 'clear') {
            ctx.clearRect(0, 0, editor.width, editor.height)
            ctx.beginPath()
        }
    }
}

editor._init()

// 1) Допиливаем магазин
// 2) Допиливаем Фотошоп
// 3) Допиливаем интерфейсные решения для старых примеров (камень-ножницы, быки...)
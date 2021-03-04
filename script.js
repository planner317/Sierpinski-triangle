'use strict'

let canvas = document.getElementById("canvas");
let speed = document.getElementById("speed");
let log = document.getElementById("log");
let procent = document.getElementById("procent");
let reset = document.getElementById("reset");
let moveClear = document.getElementById("moveClear");
let addPoint = document.getElementById("addPoint");
let deletPoint = document.getElementById("deletPoint");
let pointsDOM = document.getElementById("pointsDOM");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
/** @type{CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d")
ctx.strokeStyle = "#ff01"
let points = []
let MyPoint = { x: 100, y: 100 }

createPoint(20, window.innerHeight - 20)
createPoint(window.innerWidth / 2, 20)
createPoint(window.innerWidth - 20, window.innerHeight - 20)

function createPoint(x, y) {
  let pointDOM = document.createElement("div")
  pointDOM.className = "point"
  pointDOM.style.left = x + "px"
  pointDOM.style.top = y + "px"
  pointsDOM.append(pointDOM)
  let position = { x, y }
  points.push(position)

  pointDOM.onmousedown = () => {
    canvas.style.zIndex = 1000

    function moveAt(e) {
      pointDOM.style.left = e.x + "px"
      pointDOM.style.top = e.y + "px"
      position.x = e.x
      position.y = e.y
      canvas.style.cursor = "grabbing"
      if (moveClear.checked) reseted()
    }

    function removeEvent() {
      canvas.removeEventListener("mousemove", moveAt)
      canvas.onmouseup = null
      canvas.style.cursor = "default"
      canvas.style.zIndex = 0
      pointDOM.style.cursor = "grab"
    }

    canvas.addEventListener("mousemove", moveAt)
    canvas.onmouseout = removeEvent
    canvas.onmouseup = removeEvent
  }
}
run()

function draw(MyPoint, selectPoint) {
  MyPoint.x = MyPoint.x + (selectPoint.x - MyPoint.x) * procent.value
  MyPoint.y = MyPoint.y + (selectPoint.y - MyPoint.y) * procent.value
  ctx.rect(MyPoint.x, MyPoint.y, 1, 1)
}

function run() {
  ctx.beginPath()
  for (let i = 0; i < speed.value; i++) {
    let randomIndex = Math.floor(Math.random() * points.length);
    draw(MyPoint, points[randomIndex])
  }
  log.innerText = +log.innerText + +speed.value
  ctx.stroke()
  requestAnimationFrame(run)
}


reset.onclick = reseted

function reseted() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  log.innerText = 0
}

addPoint.onclick = () => {
  let x = Math.random() * window.innerWidth - 10
  let y = Math.random() * window.innerHeight - 10
  if (moveClear.checked) reseted()
  createPoint(x, y)
}

procent.oninput = () => {
  if (moveClear.checked) reseted()
}

deletPoint.onclick = () => {
  if (points.length < 4) {
    alert("Должно быть как минимум 3 точки")
    return
  }

  pointsDOM.lastChild.remove()
  points.pop()
  if (moveClear.checked) reseted()
}

window.onresize = ()=> window.location.reload()


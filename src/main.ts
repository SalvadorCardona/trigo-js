import './style.css'
import {angle, pythagore, radToDegree, tangente} from "./function";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <canvas></canvas>
   <div>Hypoténus : <span id="hyp-val"></span></div>
   <div>Angle Tangente: <span id="tan-val"></span></div>
   <div>Angle Tangente Degrés : <span id="tan-degree-val"></span></div>
   <div>Angle souris : <span id="tan-mouse-val"></span></div>
   <div>Angle souris degrees: <span id="tan-mouse-degree-val"></span></div>
  </div>
`

const width = 300

const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = width
canvas.style.border = "1px solid black"
canvas.style.background = 'white'

const elHypVal = document.querySelector('#hyp-val')
const elTanDegreeVal = document.querySelector('#tan-degree-val')
const elTanVal = document.querySelector('#tan-val')
const elMouseVal = document.querySelector('#tan-mouse-val')
const elMouseDeegreeVal = document.querySelector('#tan-mouse-degree-val')

const center = width/2;
const cx = (pos: number) => pos + center
const cy = (pos: number) => width - (pos + center)

const ctx = canvas.getContext('2d');


ctx.fillStyle = 'rgba(200, 0, 0, 0)';
ctx.strokeStyle = 'rgba(200, 200, 200)';

let mousePosition = {x: center+25, y:15, rx: 0, ry: 0}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const ab = 100;
  const bc = 100;
  ctx.beginPath();
  ctx.moveTo(cx(0), cy(0));
// A
  ctx.lineTo(cx(ab), cy(0));
// B
  ctx.lineTo(cx(ab), cy(bc));
// C
  ctx.lineTo(cx(0), cy(0));
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center, center, center-3, 0, Math.PI * 2, true);  // Cercle extérieur
  ctx.stroke();

  elHypVal.innerHTML = pythagore(ab, bc).toString()
  elTanVal.innerHTML = tangente(ab, bc).toString()
  elTanDegreeVal.innerHTML = radToDegree(tangente(ab, bc)).toString()



  ctx.beginPath();
  ctx.moveTo(cx(0), cy(0));
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.stroke();

  console.log(mousePosition)
  const tang = angle(0, 0, mousePosition.rx, mousePosition.ry)
  elMouseVal.innerHTML = tang.toString()
  elMouseDeegreeVal.innerHTML = radToDegree(tang).toString()

  ctx.beginPath();
  ctx.arc(center, center, 50, 0, (2*Math.PI) - tang, true);  // Cercle extérieur
  ctx.stroke();
}


render()

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mousePosition = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    rx: 0,
    ry: 0
  };

  mousePosition.rx = mousePosition.x - center
  mousePosition.ry = cy(mousePosition.y)

  render()
})







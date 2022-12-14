import './style.css'
import {angle, pythagore, radToDegree, tangente} from "./function";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <canvas></canvas>
   <div>Hypoténus : <span id="hyp-val"></span> PX</div>
   <div>X : <span id="x-val"></span> PX</div>
   <div>Y : <span id="y-val"></span> PX</div>
   <div>Angle souris : <span id="tan-mouse-val"></span>𝝿</div>
   <div>Angle souris degrees: <span id="tan-mouse-degree-val">°</span></div>
  </div>
`

const width = 300

const canvas = document.querySelector('canvas')
canvas.width = width
canvas.height = width
canvas.style.border = "1px solid black"
canvas.style.background = 'white'

const elHypVal = document.querySelector('#hyp-val')
const elXval = document.querySelector('#x-val')
const elYval = document.querySelector('#y-val')
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

  ctx.beginPath();
  ctx.arc(center, center, center-3, 0, Math.PI * 2, true);  // Cercle extérieur
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx(0), cy(0));
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.stroke();

  const tang = angle(0, 0, mousePosition.rx, mousePosition.ry)
  elMouseVal.innerHTML = tang.toFixed(2)
  elMouseDeegreeVal.innerHTML = radToDegree(tang).toFixed(2)

  ctx.beginPath();
  ctx.arc(center, center, 50, 0, (2*Math.PI) - tang, true);  // Cercle extérieur
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx(0), cy(0));
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.lineTo(cx(mousePosition.rx), cy(0));
  ctx.lineTo(cx(0), cy(0));
  ctx.stroke();

  elHypVal.innerHTML = pythagore(mousePosition.rx, mousePosition.ry).toFixed(2)
  elXval.innerHTML = mousePosition.rx.toFixed(2)
  elYval.innerHTML = mousePosition.ry.toFixed(2)

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







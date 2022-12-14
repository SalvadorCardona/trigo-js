export const pythagore = (adjacentX: number, opposseY: number): number =>
  Math.sqrt(
    Math.pow(adjacentX, 2)
    + Math.pow(opposseY, 2)
  )

export const tangente = (adjacentX: number, opposseY: number): number => {
  const radioTan = opposseY/adjacentX
  let tan = Math.tanh(radioTan)

  return tan
}

export function angle(cx, cy, ex, ey): number {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  if (theta < 0) theta = (2*Math.PI) + theta;

  return theta;
}

export const radToDegree = (radians : number): number => {
  return radians  * (180/Math.PI)
}
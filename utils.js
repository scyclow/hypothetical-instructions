const PI = Math.PI
const TWO_PI = Math.PI * 2
const HALF_PI = Math.PI/2
const QUARTER_PI = Math.PI/4
const int = parseInt
const min = Math.min
const max = Math.max
const sin = Math.sin
const cos = Math.cos


let __randomSeed = int(tokenData.hash.slice(50, 58), 16)
function rnd(mn, mx) {
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}

const rndint = (mn, mx) => int(rnd(mn, mx))
const prb = x => rnd() < x
const posOrNeg = () => prb(0.5) ? 1 : -1
const sample = (a) => a[int(rnd(a.length))]
const exists = x => !!x
const last = a => a[a.length-1]
const noop = () => {}

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}

function getXYRotation (deg, radius, cx=0, cy=0) {
  return [
    sin(deg) * radius + cx,
    cos(deg) * radius + cy,
  ]
}

function drawPath(x, y, d, size, rotation=0) {
  const path = document.createElementNS(__ns, 'path')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', '#000')
  path.setAttribute('stroke-linecap', `round`)
  path.setAttribute('stroke-linejoin', `round`)
  path.setAttribute('stroke-width', `${3 * 1.55/size}px`)
  path.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(${size}) rotate(${rotation}deg)`)

  path.setAttribute('d', d)
  return path
}
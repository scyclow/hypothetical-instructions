const PI = Math.PI
const TWO_PI = Math.PI * 2
const HALF_PI = Math.PI/2
const QUARTER_PI = Math.PI/4
const int = parseInt
const min = Math.min
const max = Math.max
const sin = Math.sin
const cos = Math.cos
const abs = Math.abs
const atan2 = Math.atan2
const dist = (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2)**2 + Math.abs(y1 - y2)**2)


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

const lineStats = (x1, y1, x2, y2) => ({
  d: dist(x1, y1, x2, y2),
  angle: atan2(x2 - x1, y2 - y1)
})

function getXYRotation (deg, radius, cx=0, cy=0) {
  return [
    sin(deg) * radius + cx,
    cos(deg) * radius + cy,
  ]
}

function drawPath(x, y, d, size, args={}) {
  const rotation = args.rotation || 0
  const strokeWidth = args.strokeWidth || 3 * 1.5/size
  const path = document.createElementNS(__ns, 'path')

  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', '#000')
  path.setAttribute('stroke-linecap', `round`)
  path.setAttribute('stroke-linejoin', `round`)
  path.setAttribute('stroke-width', `${strokeWidth}px`)
  path.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(${size}) rotate(${rotation}deg)`)

  path.setAttribute('d', d)
  return path
}



function drawLine(x1, y1, x2, y2, args={}) {
  const strokeWidth = args.strokeWidth || 3
  const line = document.createElementNS(__ns, 'line')

  line.setAttribute('fill', 'none')
  line.setAttribute('stroke', '#000')
  line.setAttribute('stroke-linecap', `round`)
  line.setAttribute('stroke-width', `${strokeWidth}px`)
  line.setAttribute('x1', x1)
  line.setAttribute('x2', x2)
  line.setAttribute('y1', y1)
  line.setAttribute('y2', y2)

  return line
}

function drawRect(x, y, w, h, f='none') {
  const fill = document.createElementNS(__ns, 'rect')

  fill.setAttribute('fill', f)
  fill.setAttribute('fill-opacity', 0.65)

  fill.setAttribute('stroke', '#000')
  fill.setAttribute('stroke-linecap', `round`)
  fill.setAttribute('stroke-linejoin', `round`)
  fill.setAttribute('stroke-width', `3px`)
  fill.setAttribute('x', x)
  fill.setAttribute('y', y)
  fill.setAttribute('width', w)
  fill.setAttribute('height', h)

  return fill
}
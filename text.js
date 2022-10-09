

const star = "M37.5 34L45 12L52 34H75.5L57 48L63.5 70L45 57.5L24.5 70L32.5 48L12 34H37.5Z"
const dick = "M53.9981 37.4949C129.498 37.4949 247.998 37.4949 247.998 37.4949C334.498 -55.9998 382.998 72.9999 315.998 72.9984C387.998 91.4948 315.998 196 247.998 91.4949C247.998 91.4949 109.996 91.4949 53.9981 91.4949M53.9981 37.4949C62.7241 58.5867 61.8974 70.4054 53.9981 91.4949M53.9981 37.4949C17.1756 37.4949 2.9508 50.3396 4.53649 63.5M53.9981 91.4949C25.3111 91.4949 6.20206 77.3233 4.53649 63.5M4.53649 63.5H26"
const cgk = `M271.068 236.5H6.93188L139 7.99364L271.068 236.5ZM139 174.5C145.28 174.5 151 169.96 151 163C151 156.373 145.627 151 139 151C132.373 151 127 156.373 127 163C127 169.96 132.72 174.5 139 174.5M141.1121 215.125C104.3582 215.244 67.666 198.2212 49.60112 164.1955C74.6789 124.8432 107.49680000000001 106.00777 139.798 106.12456C172.128 106.24146 205.096 125.3476 230.426 164.279C213.787 197.751 177.874 215.006 141.1121 215.125Z`
const arrow = 'M180.5 30.5L6.5 30.5M40 3.50003L6.5 30.5 40 57.5'

const arrowWest = (x, y, size) => svg.drawPath(x, y, arrow, { size })
const arrowEast = (x, y, size) => svg.drawPath(x, y, arrow, { size, rotation: 180 })
const arrowNorth = (x, y, size) => svg.drawPath(x, y, arrow, { size, rotation: 90 })
const arrowSouth = (x, y, size) => svg.drawPath(x, y, arrow, { size, rotation: 270 })

const bullseye = (x, y) => {
  const g = document.createElementNS(__ns, 'g')

  times(5, i => {
    const c = document.createElementNS(__ns, 'circle')
    c.setAttribute('fill', 'none')
    c.setAttribute('stroke', '#000')
    c.setAttribute('stroke-width', `5px`)

    c.setAttribute('cx', x)
    c.setAttribute('cy', y)
    c.setAttribute('r', 1+ i * 10 )
    g.appendChild(c)
  })

  return g
}



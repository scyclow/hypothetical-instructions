

function generateGears(gearsN=8, rotationMax=15, radia=0.1) {
  const gears = [
    {
      rotation: 1,
      radia: 1,
      radiaStart: 1,
      radiaAdj: (p, i, _x, _y, baseRadius, prevRadius) => i ? 1 : (p%2 ? 1 : prevRadius/baseRadius),
      ellapsedAdj: rnd(1000)
    },
    ...times(gearsN - 1, g => ({
      rotation: int(rnd(-rotationMax, rotationMax)),
      radia: rnd(0, radia),
      radiaStart: rnd(0, radia),
      radiaAdj: (p, i, _x, _y, baseRadius, prevRadius) => i ? 1 : (p%2 ? 1 : prevRadius/baseRadius),
      ellapsedAdj: rnd(1000)
    }))
  ]

  const totalRadia = gears.reduce((sum, g) => g.radia + sum, 0)
  return gears.map(g => ({
    ...g,
    radia: g.radia/totalRadia
  }))
}


function createSpirographFn(baseRadius, prevRadius, gears) {
  return (progress, p) => gears.reduce(([_x, _y], gear, i) =>
    getXYRotation(
      progress * TWO_PI * gear.rotation,
      baseRadius * gear.radia * gear.radiaAdj(p, i, _x, _y, baseRadius, prevRadius),
      _x,
      _y
    ),
    [0, 0]
  )
}

function getRosettePath(rad, gears) {
  const pointCount = 900
  const spirographFn = createSpirographFn(rad, rad, gears)
  const points = times(pointCount+1, p => spirographFn(p/(pointCount+1), p))
  let d = `M ${points[0][0]} ${points[0][1]} `
  for (let i=0; i<points.length; i++) {
    d += ` ${points[i][0]},${points[i][1]}`
  }
  d += ` ${points[0][0]},${points[0][1]}`
  // console.log(d)

  return d
}

function drawRibbedRosette(x, y, minRad, layers, {gears, rosetteRadiaChange, rosetteRotation, ...args}) {
  times(layers, t => {
    const rad = t*15 + minRad
    const rosettePath = getRosettePath(
      rad,
      gears.map(g => ({ ...g, radia: g.radia - (t*rosetteRadiaChange)}))
    )

    svg.drawPath(x, y, rosettePath, {stroke: pen.black, rotation: t*rosetteRotation, ...args})

  })
}

function drawLineRosette(x, y, minRad, maxRad, gears, args) {
  const pointCoint = 100
  const innerSpirographFn = createSpirographFn(minRad, minRad, gears)
  const outterSpirographFn = createSpirographFn(maxRad, maxRad, gears)
  const innerPoints = times(pointCoint, p => innerSpirographFn(p/pointCoint, p))
  const outterPoints = times(pointCoint, p => outterSpirographFn(p/pointCoint, p))
  innerPoints.forEach(([x1, y1], i) => {
    const [x2, y2] = outterPoints[i]
    svg.drawLine(x1+x, y1+y, x2+x, y2+y, args)
  })
}





function circleFn(x0, y0, rad, progress) {
  const [x, y] = getXYRotation(progress*TWO_PI, rad, x0, y0)
  return { x, y }
}
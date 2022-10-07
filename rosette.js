function getCirclePoints(x, y, rad, points) {
  const coords = times(points, p => circleFn(x, y, rad, p/points))
  coords.push(circleFn(x, y, rad, 0))
  return coords
}


function getStarPoints(x, y, radI, radO, points, rotate) {
  const coords = times(points+1,
    p =>
      circleFn(
        x,
        y,
        p%2
          ? radI
          : radO,
        (p+rotate)/points
      )
  )
  coords.push(circleFn(x, y, radI, radO, 0))
  return coords
}

function generateGears(gearsN=8, rotationMax=15) {
  const gears = [
    {
      rotation: 1,
      rotationStart: 1,
      radia: 1,
      radiaStart: 1,
      radiaAdj: (p, i, _x, _y, baseRadius, prevRadius) => i ? 1 : (p%2 ? 1 : prevRadius/baseRadius),
      ellapsedAdj: rnd(1000)
    },
    ...times(gearsN - 1, g => ({
      rotation: int(rnd(-rotationMax, rotationMax)),
      rotationStart: int(rnd(-rotationMax, rotationMax)),
      radia: rnd(0, 0.1),
      radiaStart: rnd(0, 0.1),
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


function createSpirographFn(x, y, baseRadius, prevRadius, gears) {
  return (progress, p) => gears.reduce(([_x, _y], gear, i) =>
    getXYRotation(
      progress * TWO_PI * gear.rotation,
      baseRadius * gear.radia * gear.radiaAdj(p, i, _x, _y, baseRadius, prevRadius),
      _x,
      _y
    ),
    [x, y]
  )
}

function getSpirographPoints(x, y, baseRadius, prevRadius, gears) {
  const points = 200
  const spirographFn = createSpirographFn(x, y, baseRadius, prevRadius, gears)
  return times(points+1, p => spirographFn(p/(points+1), p))
}



function circleFn(x0, y0, rad, progress) {
  console.log(progress)
  const [x, y] = getXYRotation(progress*TWO_PI, rad, x0, y0)
  return { x, y }
}
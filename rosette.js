

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

function getSpirographPoints(rad, gears) {
  const points = 200
  const spirographFn = createSpirographFn(rad, rad, gears)
  return times(points+1, p => spirographFn(p/(points+1), p))
}

function drawCurvePathArray(x, y, points, stroke="#000") {

  let d = `M ${points[0][0]} ${points[0][1]} `
  for (let i=0; i<points.length; i++) {
    d += ` ${points[i][0]},${points[i][1]}`
  }
  d += ` ${points[0][0]},${points[0][1]}`
  // console.log(d)

  svg.drawPath(x, y, d, {stroke})

  // const path = document.createElementNS(__ns, 'path');
  // path.setAttribute('fill', 'none');
  // path.setAttribute('stroke', stroke);
  // path.setAttribute('stroke-width', `${strokeWidth}px`);
  // path.setAttribute('d', d);




  // return path

}



function circleFn(x0, y0, rad, progress) {
  const [x, y] = getXYRotation(progress*TWO_PI, rad, x0, y0)
  return { x, y }
}
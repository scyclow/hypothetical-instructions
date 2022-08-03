/*
George accessories
  - sunglasses
  - mustache
  - soul patch
  - full beard
  - mohawk
  - x eyes
  - $ eyes
  - <3 eyes
  - tounge
  - smile
  - frown
  - angry eyebrows
  - tear drops


dashed line down the middle with patterns on one side



*/


__ns = 'http://www.w3.org/2000/svg';

function draw() {
  // set the width and height in inches

  let xin = 6.14;
  let yin = 2.61;

  // set the dpi
  let dpi = 300;

  // calculate the svg coordinate space
  let w = 1189//xin * dpi;
  let h = 507//yin * dpi;

  // set up the svg
  let svg = document.createElementNS(__ns, 'svg');

  // set the svg attributes
  svg.setAttribute('width', '100vw');
  // svg.setAttribute('height', '100vh');
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  // svg.setAttribute('style', 'background-color:white;');

  // append the document bounds
  let bounds = document.createElementNS(__ns, 'path');
  bounds.setAttribute('d', `M 0 0 M ${w} ${h}`);
  svg.appendChild(bounds);

  // ~~~~~~~~~~~~~~ ADD STUFF TO THE SVG HERE ~~~~~~~~~~~~~~ //
  // const bg = document.createElementNS(__ns, 'rect');

  // bg.setAttribute('width', w)
  // bg.setAttribute('height', h)
  // bg.setAttribute('fill', 'green')

  // svg.appendChild(bg);
  // ~~~~~~~~~~~~~~ ADD STUFF TO THE SVG HERE ~~~~~~~~~~~~~~ //



  // times(4, i => {
  //   const o = i%2 ? 0 : 0.333
  //   const d = 90
  //   const outter = (500-(i*d)) * 1.05
  //   const inner = 500 - ((i+1)*d)

  //   const starPoints1 = getStarPoints(w/2, h/2, outter, inner, 100, o)
  //   const path1 = drawCurvePath(starPoints1)
  //   svg.appendChild(path1)


  //   const starPoints2 = getStarPoints(w/2, h/2, outter, inner, 100, o+0.666)
  //   const path2 = drawCurvePath(starPoints2)
  //   svg.appendChild(path2)



  //   const starPoints3 = getStarPoints(w/2, h/2, outter, inner, 100, o+0.666*2)
  //   const path3 = drawCurvePath(starPoints3)
  //   svg.appendChild(path3)
  // })

  const gears = generateGears()
  const gears2 = generateGears()
  const gears3 = generateGears()


  //// CENTER 1
  // times(45, t => {
  //   const rad = t*70 + 150
  //   const points = getSpirographPoints(w/2, h/2, rad, rad*0.95, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

  //// CENTER 2
  // times(60, t => {
  //   const rad = t*40 + 150
  //   const points = getSpirographPoints(w/2, h/2, rad, rad, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })



  //// CENTER 3
  times(15, t => {
    const rad = t*20 + 150
    const points = getSpirographPoints(w/2, h/2, rad, rad, gears2)
    const path = drawCurvePathArray(points, '#000', 5)
    svg.appendChild(path)
  })

  // //// CORNER 1
  // times(4, t => {
  //   const rad = t*20 + 100
  //   const points = getSpirographPoints(w*0.082, h*0.25, rad, rad, gears3)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

  // //// CORNER 2
  // times(4, t => {
  //   const rad = t*20 + 100
  //   const points = getSpirographPoints(w*0.923, h*0.25, rad, rad, gears3)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

  // //// CORNER 3
  // times(4, t => {
  //   const rad = t*15 + 65
  //   const points = getSpirographPoints(w*0.075, h*0.81, rad, rad, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

  // //// CORNER 4
  // times(4, t => {
  //   const rad = t*15 + 65
  //   const points = getSpirographPoints(w*0.925, h*0.83, rad, rad, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })


  // //// CENTER 4
  // times(25, t => {
  //   const rad = t*40
  //   const points = getSpirographPoints(w/2-8+6, h/2-8-15, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#0ff', 5)
  //   svg.appendChild(path)
  // })
  // times(25, t => {
  //   const rad = t*40
  //   const points = getSpirographPoints(w/2+6, h/2-15, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#f00', 5)
  //   svg.appendChild(path)
  // })









    // const points = getSpirographPoints(w/2, h/2, 500, 0, gears)

    // points.forEach(p => {
    //   const circle = document.createElementNS(__ns, 'circle')
    //   circle.setAttribute('cx', p[0])
    //   circle.setAttribute('cy', p[1])
    //   circle.setAttribute('r', 5)
    //   svg.appendChild(circle)

    // })



  // append the svg to the body
  document.body.appendChild(svg);
}

function drawCurvePathArray(points, stroke="#000", strokeWidth=2) {

  let d = `M ${points[0][0]} ${points[0][1]} `
  for (let i=0; i<points.length; i++) {
    d += ` ${points[i][0]},${points[i][1]}`
  }
  d += ` ${points[0][0]},${points[0][1]}`
  // console.log(d)

  const path = document.createElementNS(__ns, 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', `${strokeWidth}px`);
  path.setAttribute('d', d);




  return path

}

function drawCurvePath(points, stroke="#000") {

  let d = `M ${points[0].x} ${points[0].y} `
  for (let i=1; i<points.length-1; i++) {

    d += ` ${points[i].x},${points[i].y}`
  }
  // d += ` ${points[0].x},${points[0].y}`
  // console.log(d)

  const path = document.createElementNS(__ns, 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '2px');
  path.setAttribute('d', d);




  return path

}
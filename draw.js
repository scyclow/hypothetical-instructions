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

  // let xin = 6.14;
  let xin = 6.14;
  // let yin = 2.61;
  let yin = 2.48;

  // set the dpi
  let dpi = 300;

  const adj = 194
  // calculate the svg coordinate space
  let w = xin * dpi //1189//xin * dpi;
  let h = yin * dpi //507//yin * dpi;

  // set up the svg
  let svg = document.createElementNS(__ns, 'svg');

  // set the svg attributes
  svg.setAttribute('width', '96vw');
  // svg.setAttribute('height', '100vh');
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  // svg.setAttribute('style', 'background-color:white;');

  // append the document bounds
  let bounds = document.createElementNS(__ns, 'path');
  bounds.setAttribute('d', `M 0 0 M ${w} ${h}`);
  svg.appendChild(bounds);

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

  const gears1 = generateGears()
  const gears2 = generateGears()
  const gears3 = generateGears()


  //// CENTER 1
  // times(45, t => {
  //   const rad = t*70 + 150
  //   const points = getSpirographPoints(w/2, h/2, rad, rad*0.95, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

  // CENTER 2
  // times(1, t => {
  //   const rad = 5*40 + 200
  //   const points = getSpirographPoints(w/2, h/2, rad, rad, gears)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })



  // //// CENTER 3
  // times(5, t => {
  //   const rad = t*20 + 250
  //   const points = getSpirographPoints(w/2, h/2, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })


  // // left emblem
  // times(12, t => {
  //   const rad = t*20 + 50
  //   const points = getSpirographPoints(w*0.235, h/2, rad, rad, gears1)
  //   const path = drawCurvePathArray(points, '#137e48', 5)
  //   path.setAttribute('stroke-opacity', '0.9')
  //   svg.appendChild(path)
  // })

  // // right emblem
  // times(7, t => {
  //   const rad = t*20 + 150
  //   const points = getSpirographPoints(w*0.735, h*0.56, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#0ff', 5)
  //   path.setAttribute('stroke-opacity', '0.9')
  //   svg.appendChild(path)
  // })

  // times(7, t => {
  //   const rad = t*20 + 150
  //   const points = getSpirographPoints(w*0.742, h*0.565, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   path.setAttribute('stroke-opacity', '0.9')
  //   svg.appendChild(path)
  // })

  times(7, t => {
    const rad = t*20 + 150
    const points = getSpirographPoints(w*0.747, h*0.57, rad, rad, gears2)
    const path = drawCurvePathArray(points, '#000', 5)
    // const path = drawCurvePathArray(points, '#137e48', 5)
    path.setAttribute('stroke-opacity', '0.9')
    svg.appendChild(path)
  })

  times(7, t => {
    const rad = t*20 + 150
    const points = getSpirographPoints(w*0.747, h*0.57, rad, rad, gears1)
    const path = drawCurvePathArray(points, '#000', 5)
    path.setAttribute('stroke-opacity', '0.9')
    svg.appendChild(path)
  })









  // //// CENTER 4
  times(2, t => {
    const rad = (t+1)*40
    const points = getSpirographPoints(w/2+7, h/2-33, rad, rad, gears2)
    const path = drawCurvePathArray(points, '#0ff', 5)
    svg.appendChild(path)
  })
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


  // const border = document.createElementNS(__ns, 'rect')

  // border.setAttribute('width', w)
  // border.setAttribute('height', h)
  // border.setAttribute('fill', 'none')
  // border.setAttribute('stroke-width', '10px')
  // border.setAttribute('stroke', 'blue')

  const numFill0 = bigOne(w*.046,h*.145, '#f00')
  svg.appendChild(numFill0)

  const numFill1 = bigOne(w*.92,h*.137, '#f00')
  svg.appendChild(numFill1)

  const numFill2 = smallOne(w*.926,h*.794, '#f0f')
  svg.appendChild(numFill2)

  const numFill3 = smallOne(w*.043,h*.778, '#f0f')
  svg.appendChild(numFill3)

  const bottomFill = bottomTxt(w*.312,h*.905, '#f0f')
  svg.appendChild(bottomFill)

  const usaFill = usaTxt(w*.155,h*.1, '#0ff')
  svg.appendChild(usaFill)

  const topFill = topTxt(w*.237,h*.01, '#f80')
  svg.appendChild(topFill)




  // //// CORNER 1
  times(2, t => {
    const rad = t*20 + 120
    const points = getSpirographPoints(w*0.066, h*0.25, rad, rad, gears3)
    const path = drawCurvePathArray(points, '#000', 5)
    svg.appendChild(path)
  })

  //// CORNER 2
  times(2, t => {
    const rad = t*20 + 120
    const points = getSpirographPoints(w*0.94, h*0.23, rad, rad, gears3)
    const path = drawCurvePathArray(points, '#000', 5)
    svg.appendChild(path)
  })

  //// CORNER 3
  times(2, t => {
    const rad = t*30 + 75
    const points = getSpirographPoints(w*0.056, h*0.84, rad, rad, gears3)
    const path = drawCurvePathArray(points, '#000', 5)
    svg.appendChild(path)
  })

  //// CORNER 4
  times(2, t => {
    const rad = t*30 + 75
    const points = getSpirographPoints(w*0.94, h*0.86, rad, rad, gears3)
    const path = drawCurvePathArray(points, '#000', 5)
    svg.appendChild(path)
  })


  const blouse = fillBlouse(w*.458,h*.555, '#0f0')
  svg.appendChild(blouse)

  const hair = fillHair(w*.415,h*.275, '#ff0')
  svg.appendChild(hair)

  const glassesPath = glasses(w*.475,h*.428)
  svg.appendChild(glassesPath)

  const cigarettePath = cigarette(w*.528,h*.522)
  svg.appendChild(cigarettePath)

  const curlyStachePath = curlyStache(w*.505,h*.535)
  svg.appendChild(curlyStachePath)

  const angryPath = angry(w*.494,h*.405)
  svg.appendChild(angryPath)


  const devilHornsPath = devilHorns(w*.45,h*.24)
  svg.appendChild(devilHornsPath)

  const teardropsPath = teardrops(w*.491,h*.463)
  svg.appendChild(teardropsPath)

  const tiePath = tie(w*.495,h*.66)
  svg.appendChild(tiePath)

  const beardPath = beard(w*.479,h*.535)
  svg.appendChild(beardPath)

  // const bowtiePath = bowtie(w*.484,h*.66)
  // svg.appendChild(bowtiePath)


  // const xEyesPath = xEyes(w*.497,h*.43)
  // svg.appendChild(xEyesPath)

  // const heartsPath = hearts(w*.497,h*.43)
  // svg.appendChild(heartsPath)

  // const monocolePath = monocole(w*.487,h*.425)
  // svg.appendChild(monocolePath)

  // const noseRingPath = noseRing(w*.523,h*.53)
  // svg.appendChild(noseRingPath)

  // const thinStachePath = thinStache(w*.51,h*.543)
  // svg.appendChild(thinStachePath)



  // const tonguePath = tongue(w*.522,h*.56)
  // svg.appendChild(tonguePath)

  // const smileyPath = smiley(w*.505,h*.535)
  // svg.appendChild(smileyPath)

  // const frownyPath = frowny(w*.504,h*.552)
  // svg.appendChild(frownyPath)

  // const openMouthPath = openMouth(w*.51,h*.547)
  // svg.appendChild(openMouthPath)



  // const dickPath = drawPath(w*.529,h*.522, dick, 0.4)
  // svg.appendChild(dickPath)

  const dickPath = drawPath(w*.3,h*.522, dick, 0.4)
  svg.appendChild(dickPath)
  const cgkPath = drawPath(w*.3,h*.35, cgk, 0.4)
  svg.appendChild(cgkPath)

  const arrW = arrowWest(w*.128, h*.52, 0.4)
  svg.appendChild(arrW)
  const arrE = arrowEast(w*.12, h*.55, 0.4)
  svg.appendChild(arrE)

  const arrN = arrowNorth(w*.13, h*.55, 0.4)
  svg.appendChild(arrN)

  const arrS = arrowSouth(w*.118, h*.52, 0.4)
  svg.appendChild(arrS)

  const bullseyePath = bullseye(w*0.35, h*0.65)
  svg.appendChild(bullseyePath)

  const starPath = drawPath(w*.345,h*.725, star, 0.65)
  svg.appendChild(starPath)




  // const laserEyesPath = laserEyes(w*.5,h*.437)
  // svg.appendChild(laserEyesPath)

  // const mohawkPath = mohawk(w*.423,h*.1)
  // svg.appendChild(mohawkPath)

  // const worriedPath = worried(w*.494,h*.407)
  // svg.appendChild(worriedPath)

  // const wearyPath = weary(w*.49,h*.462)
  // svg.appendChild(wearyPath)



  // const text = document.createElementNS(__ns, 'text')
  // text.innerHTML = "DON'T TRUST THE LIBERAL MEDIA 666"
  // text.setAttribute('x', 150)
  // text.setAttribute('y', 300)
  // text.setAttribute('font-size', '50px')
  // text.setAttribute('font-family', 'sans-serif')
  // svg.appendChild(text)


  // const circle = document.createElementNS(__ns, 'circle')
  // circle.setAttribute('cx', '1200px')
  // circle.setAttribute('cy', '450px')
  // circle.setAttribute('r', '20px')
  // // circle.setAttribute('fill', '#000')
  // svg.appendChild(circle)


  const verticalCut = cut(w*.5, w*.5, 0, h)

  svg.appendChild(verticalCut)

  // const horizontalCut = cut(0, w, h*0.5, h*0.5)

  // svg.appendChild(horizontalCut)



/*
DON'T BELIEVE THE LIBERAL MEDIA
$$$$$$$
STEVE PIKELNY / STEVIEP.XYZ
IOU
TIME = MONEY
LUCKY DOLLAR
GOOD LUCK!
MONEY MAKES THE WORLD GO ROUND



TRACK THIS DOLLAR AT WWW.WHERESGEORGE.COM
ABOLISH THE FED
DO NOT SPEND
SPEND WISELY
SPEND ME
SELL ME
BUY BITCOIN
TAKE THE MONEY AND RUN
STOP THROWING YOUR MONEY AWAY
DO YOUR OWN RESEARCH
RETURN TO CIRCULATION
PUNCH A FASCIST
ACCEPT JESUS AS YOUR LORD AND SAVIOUR
BE A GOOD PERSON
SMOKE WEED EVERY DAY
GO FUCK YOURSELF


*/

  const testText = text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 270, 220,0.3)
  const testText2 = text("0123456789!.$=", 265, 247,0.3)
  const testText3 = text("0123456789", 270, 550,0.65)
  svg.appendChild(testText)
  svg.appendChild(testText2)
  svg.appendChild(testText3)



  // svg.appendChild(border)

  border1(svg, h, w)


  // append the svg to the body
  document.body.appendChild(svg);


  console.log(svg.outerHTML)
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


function cut(x1, x2, y1, y2) {
  const cutLine = document.createElementNS(__ns, 'line')
  cutLine.setAttribute('x1', x1)
  cutLine.setAttribute('x2', x2)
  cutLine.setAttribute('y1', y1)
  cutLine.setAttribute('y2', y2)
  cutLine.setAttribute('stroke', '#000')
  cutLine.setAttribute('stroke-width', '3px')
  cutLine.setAttribute('stroke-dasharray', '20 7')

  return cutLine
}

function border1(svg, h, w) {
  const b = (size) => {
    const b1 = document.createElementNS(__ns, 'rect')
    const adjSize = 1-(2*(1-size))
    b1.setAttribute('x', (1-size)*w)
    b1.setAttribute('y', (1-size)*h)
    b1.setAttribute('width', adjSize*w)
    b1.setAttribute('height', adjSize*h)
    b1.setAttribute('fill', 'none')
    b1.setAttribute('stroke', '#000')
    b1.setAttribute('stroke-width', '8px')
    return b1
  }
  svg.appendChild(b(0.995))
  // svg.appendChild(b(0.98))
  // svg.appendChild(b(0.965))
  // svg.appendChild(b(0.95))
  // svg.appendChild(b(0.935))
  // svg.appendChild(b(0.92))
}


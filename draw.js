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

      // <img src="./dollarClipped.jpeg" style="width: 100vw; position: fixed; z-index: -100;">
      // https://ipfs.io/ipfs/bafybeiaxqcum3dorimpywtf2rbayujxlkygpyft47yfrd37catiheyojb4
  const externalAsset = tokenData.externalAssetDependencies[0].cid


  const bg = document.createElement('img')
  bg.setAttribute('src', tokenData.preferredIPFSGateway + externalAsset)
  bg.setAttribute('style', 'width: 100vw; position: fixed; z-index: -100;')
  document.body.appendChild(bg)


  // set the width and height in inches

  // let xin = 6.14
  // let yin = 2.61
  const xin = 5.8125
  const yin = 2.34252

  // set up the svg
  svg = new SVG(xin, yin)











//   //// CENTER 1
  // times(45, t => {
  //   const rad = t*70 + 150
  //   const points = getSpirographPoints(w/2, h/2, rad, rad*0.95, gears1)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })

//   // CENTER 2
  // times(1, t => {
  //   const rad = 5*40 + 200
  //   const points = getSpirographPoints(w/2, h/2, rad, rad, gears1)
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


  // left emblem
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

//   times(7, t => {
//     const rad = t*20 + 150
//     const points = getSpirographPoints(w*0.747, h*0.57, rad, rad, gears2)
//     const path = drawCurvePathArray(points, '#000', 5)
//     // const path = drawCurvePathArray(points, '#137e48', 5)
//     path.setAttribute('stroke-opacity', '0.9')
//     svg.appendChild(path)
//   })








//     // const points = getSpirographPoints(w/2, h/2, 500, 0, gears)

//     // points.forEach(p => {
//     //   const circle = document.createElementNS(__ns, 'circle')
//     //   circle.setAttribute('cx', p[0])
//     //   circle.setAttribute('cy', p[1])
//     //   circle.setAttribute('r', 5)
//     //   svg.appendChild(circle)

//     // })


//   // const border = document.createElementNS(__ns, 'rect')

//   // border.setAttribute('width', w)
//   // border.setAttribute('height', h)
//   // border.setAttribute('fill', 'none')
//   // border.setAttribute('stroke-width', '10px')
//   // border.setAttribute('stroke', 'blue')












// //   // //// CORNER 1
//   times(2, t => {
//     const rad = t*20 + 120
//     const points = getSpirographPoints(w*0.066, h*0.25, rad, rad, gears3)
//     const path = drawCurvePathArray(points, '#000', 5)
//     svg.appendChild(path)
//   })

// //   //// CORNER 2
//   times(2, t => {
//     const rad = t*20 + 120
//     const points = getSpirographPoints(w*0.94, h*0.23, rad, rad, gears3)
//     const path = drawCurvePathArray(points, '#000', 5)
//     svg.appendChild(path)
//   })

// //   //// CORNER 3
//   times(2, t => {
//     const rad = t*30 + 75
//     const points = getSpirographPoints(w*0.056, h*0.84, rad, rad, gears3)
//     const path = drawCurvePathArray(points, '#000', 5)
//     svg.appendChild(path)
//   })

// //   //// CORNER 4
//   times(2, t => {
//     const rad = t*30 + 75
//     const points = getSpirographPoints(w*0.94, h*0.86, rad, rad, gears3)
//     const path = drawCurvePathArray(points, '#000', 5)
//     svg.appendChild(path)
//   })



  // const cgkPath = drawPath(w*.51,h*.34, cgk, 0.15)
  // svg.appendChild(cgkPath)




  // const dickPath = drawPath(w*.3,h*.522, dick, 0.4)
  // svg.appendChild(dickPath)
  // const cgkPath = drawPath(w*.3,h*.35, cgk, 0.4)
  // svg.appendChild(cgkPath)

  // const arrW = arrowWest(w*.128, h*.52, 0.4)
  // svg.appendChild(arrW)
  // const arrE = arrowEast(w*.12, h*.55, 0.4)
  // svg.appendChild(arrE)

  // const arrN = arrowNorth(w*.13, h*.55, 0.4)
  // svg.appendChild(arrN)

  // const arrS = arrowSouth(w*.118, h*.52, 0.4)
  // svg.appendChild(arrS)

  // const bullseyePath = bullseye(w*0.35, h*0.65)
  // svg.appendChild(bullseyePath)

  // const starPath = drawPath(w*.345,h*.725, star, 0.65)
  // svg.appendChild(starPath)






//   // const text = document.createElementNS(__ns, 'text')
//   // text.innerHTML = "DON'T TRUST THE LIBERAL MEDIA 666"
//   // text.setAttribute('x', 150)
//   // text.setAttribute('y', 300)
//   // text.setAttribute('font-size', '50px')
//   // text.setAttribute('font-family', 'sans-serif')
//   // svg.appendChild(text)







//   // const horizontalCut = cut(0, w, h*0.5, h*0.5)

//   // svg.appendChild(horizontalCut)



// /*
// STEVE PIKELNY / STEVIEP.XYZ
// TIME = MONEY
// LUCKY DOLLAR
// GOOD LUCK!
// MONEY MAKES THE WORLD GO ROUND



// DON'T BELIEVE THE LIBERAL MEDIA
// TRACK THIS DOLLAR AT WWW.WHERESGEORGE.COM
// ABOLISH THE FED
// DO NOT SPEND
// SPEND WISELY
// SPEND ME
// SELL ME
// BUY BITCOIN
// TAKE THE MONEY AND RUN
// STOP THROWING YOUR MONEY AWAY
// DO YOUR OWN RESEARCH
// RETURN TO CIRCULATION
// PUNCH A FASCIST
// ACCEPT JESUS CHRIST AS YOUR LORD AND SAVIOUR
// BE A GOOD PERSON
// SMOKE WEED EVERY DAY
// GO FUCK YOURSELF
// BURN HERE
// CLICK HERE TO MAKE FAST CASH NOW WWW.FASTCASHMONEYPLUS.BIZ
// TEXT 1.848.225.7281 FOR A GOOD TIME


// */

  // const testText = text("TRACK THIS DOLLAR", 270, 220,0.3)
  // const testText2 = text("AT WWW.WHERESGEORGE.COM", 265, 247,0.3)
  // const testText = text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 270, 220,0.3)
//   const testText2 = text("0123456789!.$=", 265, 247,0.3)
//   const testText3 = text("0123456789", 270, 550,0.65)
  // svg.appendChild(testText)
  // svg.appendChild(testText2)
//   svg.appendChild(testText3)









  layout()
  //




  // border1()


  // append the svg to the body

  svg.mount()

}




draw()


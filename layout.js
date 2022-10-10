function layout(svg) {

  const isStarNote = prb(0.03)

  const leftRosette = prb(0.5)
  const rightRosette = prb(0.5)
  const centerRosette = prb(0.05)
  const cutHere = prb(0.1)
  const burnHere = prb(0.05)

  const rosetteRadia = 0.08 // higher == more dramatic

  // LEFT SIDE

  if (leftRosette) {
    const gears1 = generateGears(8, 15, rosetteRadia)
    times(10, t => {
      const rad = t*15 + 40
      const points = getSpirographPoints(rad, gears1)
      drawCurvePathArray(413, 350, points, '#000')
    })
    // 1, 6, 7, 9
    drawSections(1, 6, 7,9)
  } else {
    drawSections(1, 2, 3, 4, 5, 6, 7, 8, 9)

    // SECTION 1


    // SECTION 2


    // SECTION 3


    // SECTION 4


    // SECTION 5


    // SECTION 6


    // SECTION 7


    // SECTION 8


    // SECTION 9

  }


  if (rightRosette) {
    const gears2 = generateGears(8, 15, rosetteRadia)
    times(8, t => {
      const rad = t*15 + 60
      const points = getSpirographPoints(rad, gears2)
      drawCurvePathArray(1305, 404, points, '#000')
    })

    // 11, 12, 13, 14,17, 20
    drawSections(!cutHere && 10, 11, 12, 13, 16, 19)

  } else {
    drawSections(!cutHere && 10, 11, 12, 13, 14, 15, 16, 17, 18, 19)

  }


  if (centerRosette) {
    const gears = generateGears(8, 15, rosetteRadia)
    times(6, t => {
      const rad = (t+1)*14
      const points = getSpirographPoints(rad, gears)
      drawCurvePathArray(880, 316, points, '#000')
    })

  } else {
    drawFace()
  }










  // FACE ROSETTE
  // times(3, t => {
  //   const rad = (t+1)*40
  //   const points = getSpirographPoints(w/2+7, h/2-33, rad, rad, gears2)
  //   const path = drawCurvePathArray(points, '#000', 5)
  //   svg.appendChild(path)
  // })



  if (cutHere) verticalCut()



  // // RIGHT EMBLEM



  if (prb(0.5))
    bigOne(81, 98, highlighter.red)
  if (prb(0.5))
    bigOne(1604, 91, highlighter.yellow)
  if (prb(0.5))
    smallOne(1616, 549, highlighter.orange)
  if (prb(0.5))
    smallOne(75, 545, highlighter.blue)
  if (prb(0.2))
    bottomTxt(544, 632, highlighter.green)
  if (prb(0.2))
  usaTxt(270, 68, highlighter.purple)
  if (prb(0.2))
    topTxt(413, 7, '#f80')
  if (prb(0.05))
   boner()

}


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


const sectionFns = {
  [0]: () => {

  },
  [1]: () => {
    svg.drawRect(630, 135, 230, 30)
    svg.text('1', 635, 142, {size: 0.2})
  },
  [2]: () => {
    if (prb(0.1)) {
      svg.drawRect(248, 200, 430, 50)
      svg.text('2', 248+5, 200+2)
    } else {
      chance(
        [1, () => svg.text("TIME = MONEY", 253, 203)],
        [1, () => svg.text("LUCKY DOLLAR", 253, 203)],
        [1, () => svg.text("GOOD LUCK", 253, 203)],
        [1, () => svg.text("MONEY MAKES THE WORLD GO ROUND", 253, 203)],
        [1, () => svg.text("DON'T BELIEVE THE LIBERAL MEDIA", 253, 203)],
        [1, () => svg.text("ABOLISH THE FED", 253, 203)],
        [1, () => {
          svg.text("ACCEPT JESUS CHRIST AS", 253, 203)
          svg.text("YOUR LORD AND SAVIOUR", 253, 228)
        }],
      )()
    }
  },
  [3]: () => {
    svg.drawRect(263, 260, 55, 80)
    svg.text('3', 263+5, 260+2)

  },
  [4]: () => {
    svg.drawRect(506, 265, 153, 185)
    svg.text('4', 506+5, 265+2)

  },
  [5]: () => {
    svg.drawRect(123, 352, 195, 100)
    svg.text('5', 123+5, 352+2)

  },
  [6]: () => {
    svg.drawRect(123, 461, 76, 40)
    svg.text('6', 123+5, 461+2)

  },
  [7]: () => {
    svg.drawRect(578, 461, 73, 42)
    svg.text('7', 578+5, 461+2)

  },
  [8]: () => {
    svg.drawRect(250, 510, 390, 35)
    svg.text('8', 250+5, 510+2)

  },
  [9]: () => {
    svg.drawRect(186, 588, 100, 40)
    svg.text('9', 186+5, 588+2)

  },
  [10]: () => {
    svg.drawRect(885, 135, 220, 30)
    svg.text('10', 885+5, 135+2, {size: 0.2})

  },
  [11]: () => {
    svg.drawRect(1110, 135, 380, 50)
    svg.text('11', 1110+5, 135+2)

  },
  [12]: () => {
    svg.drawRect(1065, 179, 45, 55)
    svg.text('12', 1065+5, 179+2)

  },
  [13]: () => {
    svg.drawRect(1475, 191, 35, 100)
    svg.text('13', 1475+5, 191+2)

  },
  [14]: () => {
    svg.drawRect(1078, 241, 100, 240)
    svg.text('14', 1078+5, 241+2)

  },
  [15]: () => {
    svg.drawRect(1189, 241, 275, 19)
    svg.text('15', 1189+5, 241+2)
  },
  [16]: () => {
    svg.drawRect(1525, 261, 54, 76)
    svg.text('16', 1525+5, 261+2)
  },
  [17]: () => {
    svg.drawRect(1450, 348, 150, 115)
    svg.text('17', 1450+5, 348+2)
  },
  [18]: () => {
    svg.drawRect(1109, 497, 465, 35)
    svg.text('18', 1109+5, 497+2)
  },
  [19]: () => {
    svg.drawRect(1443, 590, 115, 40)
    svg.text('19', 1443+5, 590+2)
  },
}







function drawSections(...sections) {
  sections.forEach(s => s !== false && sectionFns[s]())
}


function cut(x1, y1, x2, y2) {
  const {d, angle} = lineStats(x1, y1, x2, y2)

  const g = document.createElementNS(__ns, 'g')
  let x = x1
  let y = y1
  for (let i=0; i < d; i+= 27) {
    const [_x, _y] = getXYRotation(angle, 18, x, y)
    svg.drawLine(x, y, _x, _y)
    ;([x, y] = getXYRotation(angle, 27, x, y))
  }


  return g
}

  function boner() {
    svg.text("B", 510, 633, { size: 0.85, strokeWidth: 12})
    svg.text("R", 765, 633, { size: 0.85, strokeWidth: 12})

    svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12})
    svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12})
    svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12})


  }

  function verticalCut() {
    cut(872, 0, 872, 702)


    arrowWest(885, 140, 0.3)

    svg.text("CUT HERE", 950, 140)

  }

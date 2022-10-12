function layout(svg) {

  const leftRosette = false//prb(0.5)
  const rightRosette = false//prb(0.5)
  const centerRosette = false//prb(0.05)
  const cutHere = prb(0.1)
  const isWorthless = false//prb(0.03)

  const rosetteRadia = 0.08
  const rosetteRotation = 0
  // const rosetteRadia = 0.38 // higher == more dramatic
  // const rosetteRotation = 3

  const sectionFeatures = {
    isStarNote: prb(0.03),
    burnHere: prb(0.05),
    isBizCard: prb(0.05),
    wheresGeorgeOverride: false//prb(0.05)
  }



  if (leftRosette) {
    const gears1 = generateGears(8, 15, rosetteRadia)
    times(10, t => {
      const rad = t*15 + 40
      const rosettePath = getRosettePath(rad, gears1)
      svg.drawPath(413, 350, rosettePath, {stroke: pen.black, rotation: t*rosetteRotation})

    })
    // 1, 6, 7, 9
    drawSections(1, 6, 7,9)
  } else {
    drawSections([1, 2, 3, 4, 5, 6, 7, 8, 9], sectionFeatures)
  }


  if (rightRosette) {
    const gears2 = generateGears(8, 15, rosetteRadia)
    times(8, t => {
      const rad = t*15 + 60
      const rosettePath = getRosettePath(rad, gears2)
      svg.drawPath(1305, 404, rosettePath, {stroke: pen.black, rotation: t*rosetteRotation*-1})

    })

    // 11, 12, 13, 14,17, 20
    drawSections(!cutHere && 10, 11, 12, 13, 16, 19)

  } else {
    drawSections([!cutHere && 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], sectionFeatures)
  }


  if (centerRosette) {
    const gears = generateGears(8, 15, rosetteRadia)
    times(6, t => {
      const rad = (t+1)*14
      const rosettePath = getRosettePath(rad, gears)
      svg.drawPath(880, 316, rosettePath, {stroke: pen.black})

    })

  } else {
    drawFace()
  }


  if (sectionFeatures.isStarNote) {
    svg.drawPath(580, 463, star, {size: 0.4, stroke: pen.green})
    svg.drawPath(1476, 198, star, {size: 0.4, stroke: pen.green})
  }

  if (sectionFeatures.isBizCard) {
    const fill = rndHighlighter()
    svg.drawRect(206, 583, 280, 40, {fill, stroke: 'none'})
    svg.text('STEVE PIKELNY', 215, 590, {size: 0.35})
    svg.drawRect(1290, 590, 230, 40, {fill, stroke: 'none'})
    svg.text('STEVIEP.XYZ', 1300, 600, {size: 0.35})
  }

  if (sectionFeatures.wheresGeorgeOverride) {
    svg.drawRect(506, 215, 153, 235, {stroke: pen.red})
    svg.text('TRACK', 530, 228, {size: 0.37, stroke: pen.red})
    svg.text('ME AT', 530, 266, {size: 0.37, stroke: pen.red})
    svg.text('WWW.', 530, 304, {size: 0.37, stroke: pen.red})
    svg.text('WHERES', 512, 344, {size: 0.37, stroke: pen.red})
    svg.text('GEORGE', 512, 380, {size: 0.37, stroke: pen.red})
    svg.text('.COM', 530, 418, {size: 0.37, stroke: pen.red})
  }

  if (sectionFeatures.burnHere) {
    if (prb(0.5)) {
      svg.drawRect(506, 265, 153, 185)
      svg.text('BURN', 550, 275)
      bullseye(583, 356, 6)
      svg.text('HERE', 550, 418)
    } else {
      const tb = prb(0.5)
      const mid = !tb || prb(0.5)
      tb && arrowWest(505, 280, 0.7)
      svg.text('BURN', 550, 322)
      mid && arrowWest(505, 335, 0.7)
      svg.text('HERE', 550, 375)
      tb && arrowWest(505, 390, 0.7)
    }
  }

  if (cutHere) verticalCut()


  if (isWorthless)
    worthless()

  // if (prb(0.5))
  //   usaText(pen.red)
  // else if (prb(0.4))
  //   usaTxt(270, 68, highlighter.purple)


  // if (prb(0.5)) {
  //   bigOne(81, 98)
  //   times(5, i => {
  //     svg.drawPath(81 + i*9, 98+i*15, onePath, { size: 1.5 - (i*0.4), stroke: 'red' })
  //   })
  // }
  // if (prb(0.5)) {
  //   bigOne(1604, 91)
  //   times(5, i => {
  //     svg.drawPath(1604 + i*9, 91+i*15, onePath, { size: 1.5 - (i*0.4), stroke: 'red' })
  //   })
  // }
  // if (prb(0.5)) {
  //   smallOne(1616, 549, highlighter.orange)

  // }
  // if (prb(0.5)) {
  //   smallOne(75, 545, highlighter.blue)

  // }
  // if (prb(0.2)) {
  //   bottomTxt(544, 632, highlighter.green)
  // }
  // if (prb(0.2)) {
  //   topTxt(413, 7, highlighter.yellow)
  // }
  // if (prb(0.05)) {
  //  boner()
  // }

}


// STEVE PIKELNY / STEVIEP.XYZ
// TIME = MONEY
// LUCKY DOLLAR
// GOOD LUCK!
// MONEY MAKES THE WORLD GO ROUND
// DON'T BELIEVE THE LIBERAL MEDIA
// ABOLISH THE FED
// ACCEPT JESUS CHRIST AS YOUR LORD AND SAVIOUR
// TRACK THIS DOLLAR AT WWW.WHERESGEORGE.COM
// DO NOT SPEND
// SPEND WISELY
// SPEND ME
// RETURN TO CIRCULATION
// SELL ME
// BUY BITCOIN
// TAKE THE MONEY AND RUN
// STOP THROWING YOUR MONEY AWAY
// DO YOUR OWN RESEARCH
// BURN HERE



// PUNCH A FASCIST
// BE A GOOD PERSON
// SMOKE WEED EVERY DAY
// GO FUCK YOURSELF
// CLICK HERE TO MAKE FAST CASH NOW WWW.FASTCASHMONEYPLUS.BIZ
// TEXT 1.848.225.7281 FOR A GOOD TIME


const rndText = (x, y) => chance(
  [1, () => svg.text("TIME = MONEY", x+35, y, {size: 0.45})],
  [1, () => svg.text("LUCKY DOLLAR", x+45, y, {size: 0.45})],
  [1, () => svg.text("GOOD LUCK!", x+65, y, {size: 0.45})],
  [1, () => {
    svg.text("MONEY MAKES THE", x+55, y-5)
    svg.text("WORLD GO ROUND", x+60, y+20)
  }],
  [1, () => {
    svg.text("DON'T BELIEVE", x+90, y-5)
    svg.text("THE LIBERAL MEDIA", x+55, y+22)
  }],
  [1, () => svg.text("ABOLISH THE FED", x+10, y, {size: 0.45})],
  [1, () => {
    svg.text("ACCEPT JESUS CHRIST AS", x+2, y-5)
    svg.text("YOUR LORD AND SAVIOUR", x+7, y+20)
  }],
  [1, () => svg.text("666", x+110, y, {size: 0.65})],
  [1, () => svg.text("$$$$$$$$$$$$$$", x+10, y, {size: 0.45})],
  [1, () => svg.text("DO NOT SPEND", x+35, y, {size: 0.45})],
  [1, () => svg.text("SPEND WISELY", x+35, y, {size: 0.45})],
  [1, () => svg.text("SPEND ME", x+105, y, {size: 0.45})],
  [1, () => svg.text("SELL ME", x+105, y, {size: 0.45})],
  [1, () => svg.text("RETURN TO CIRCULATION", x+5, y,)],
  [1, () => svg.text("BUY BITCOIN", x+65, y, {size: 0.45})],
  [1, () => {
    svg.text("TAKE THE MONEY", x+70, y-5)
    svg.text("AND RUN", x+70, y+20)
  }],
  [1, () => {
    svg.text("STOP THROWING", x+100, y-5)
    svg.text("YOUR MONEY AWAY", x+70, y+20)
  }],
  [1, () => svg.text("DO YOUR OWN RESEARCH", x+10, y)],
  [1, () => svg.text("WWW.FASTCASHMONEYPLUS.BIZ", x-20, y+5, {size: 0.3})],
)()

const sectionFns = {
  [0]: () => {

  },
  [1]: () => {
    svg.drawRect(630, 135, 230, 30)
    svg.text('1', 635, 142, {size: 0.2})
  },
  [2]: (features) => {
    if (features.wheresGeorgeOverride) {
      return
    }
    else chance(
      [1, () => {
        svg.drawRect(248, 200, 430, 50)
        svg.text('2', 248+5, 200+2)
      }],
      [5, () => rndText(253, 213)],
      [5, () => {}],
    )()


  },
  [3]: () => {
    svg.drawRect(263, 260, 55, 80)
    svg.text('3', 263+5, 260+2)

  },
  [4]: (features) => {
    if (!features.wheresGeorgeOverride) chance(
      [1, () => {
        svg.drawRect(506, 265, 153, 185)
        svg.text('4', 506+5, 265+2)
      }],
      [4, () => {
        // TODO symbols
      }]
    )

  },
  [5]: () => {
    svg.drawRect(123, 352, 195, 100)
    svg.text('5', 123+5, 352+2)

  },
  [6]: () => {
    svg.drawRect(123, 461, 76, 40)
    svg.text('6', 123+5, 461+2)

  },
  [7]: (features) => {
    if (!features.isStarNote) {
      chance(
        [1, () => {}],
        [1, () => {
          svg.drawRect(578, 461, 73, 42)
          svg.text('7', 578+5, 461+2)
        }],
      )()
    }



  },
  [8]: () => {
    chance(
      [1, () => {
        svg.drawRect(250, 510, 390, 35)
        svg.text('8', 250+5, 510+2)
      }],
      [1, () => {
        svg.text(times(8, () => rndint(10)).join('') + rndChar(), 255, 512, {size: 0.6, stroke: pen.green })
      }],
      [1, () => {
        svg.text('$$$$$$$$', 255, 512, {size: 0.6, stroke: pen.green })
      }],
      [1, () => {}]
    )()
  },
  [9]: (features) => {
    if (!features.isBizCard) {
      svg.drawRect(186, 588, 100, 40)
      svg.text('9', 186+5, 588+2)
    }

  },
  [10]: () => {
    svg.drawRect(885, 135, 220, 30)
    svg.text('10', 885+5, 135+2, {size: 0.2})

  },
  [11]: () => {
    chance(
      [1, () => {
        svg.drawRect(1110, 135, 380, 50)
        svg.text('11', 1110+5, 135+2)
      }],
      [1, () => {
        svg.text(rndChar() + times(8, () => rndint(10)).join('') + rndChar(), 1117, 143, {size: 0.6, stroke: pen.green })
      }],
      [1, () => {
        svg.text('$$$$$$$$$$', 1110, 143, {size: 0.6, stroke: pen.green })
      }],
      [1, () => {}]
    )()


  },
  [12]: () => {
    svg.drawRect(1065, 179, 45, 55)
    svg.text('12', 1065+5, 179+2)

  },
  [13]: (features) => {
    if (!features.isStarNote) {
      chance(
        [1, () => {}],
        [1, () => {
          svg.drawRect(1475, 191, 35, 100)
          svg.text('13', 1475+5, 191+2)
        }],
      )
    }

  },
  [14]: () => {
    svg.drawRect(1078, 241, 100, 240)
    svg.text('14', 1078+5, 241+2)

  },
  [15]: () => {
    chance(
      [1, () => {
        svg.drawRect(1189, 241, 275, 60)
        svg.text('15', 1189+5, 241+2)
      }],
      [1, () => svg.text('MARFA,TX', 1200, 250, {size: 0.5, stroke: pen.red})],
      [1, () => {}]
    )()
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
  [19]: (features) => {
    if (!features.isBizCard) {
      svg.drawRect(1443, 590, 115, 40)
      svg.text('19', 1443+5, 590+2)
    }


  },
}







function drawSections(sections, features) {
  sections.forEach(s => s !== false && sectionFns[s](features))
}


function cut(x1, y1, x2, y2) {
  const {d, angle} = lineStats(x1, y1, x2, y2)

  let x = x1
  let y = y1
  for (let i=0; i < d; i+= 27) {
    const [_x, _y] = getXYRotation(angle, 18, x, y)
    svg.drawLine(x, y, _x, _y)
    ;([x, y] = getXYRotation(angle, 27, x, y))
  }
}

  function boner() {
    svg.text("B", 510, 633, { size: 0.85, strokeWidth: 12})
    svg.text("R", 765, 633, { size: 0.85, strokeWidth: 12})

    svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12})
    svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12})
    svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12})
  }

  function worthless() {
    svg.text("WORTHLESS",300, 450, { size: 2, strokeWidth: 6})

  }

  function verticalCut() {
    cut(872, 0, 872, 702)


    arrowWest(885, 140, 0.3)

    svg.text("CUT HERE", 950, 140)

  }

  // TODO diagonal lines
  function pattern() {

  }

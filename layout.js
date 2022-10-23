function layout() {

  const leftRosette = prb(0.7)
  const rightRosette = prb(0.7)
  const centerRosette = prb(0.05)
  const isWorthless = prb(0.03)
  const randomSymbols = prb(0.02)
  const drawGrid = prb(0.03)
  const drawBoner = prb(0.05)

  const burnHere = prb(0.05)
  const sectionFeatures = {
    burnHere,
    isStarNote: prb(0.03),
    isBizCard: prb(0.05),
    wheresGeorgeOverride: !burnHere && prb(0.06),
    showHash: prb(0.1),
    cutHere: prb(0.1),
  }


  // if 1,2,3, then don't do any other side features
  const variation = chance(
    [3, 0],
    [1, 1],
    [2, 2],
    [1, 3],
  )
  const rosetteRadia = variation === 1 ? rnd(0.1, 0.4) : 0.08

  const rosetteRadiaChange = variation === 2 ? chance(
    [1, 0.01],
    [1, 0.005]
  ) : 0

  const rosetteRotation = variation === 3 ? rndint(3, 11) : 0

  const rosetteLines = chance(
    [10, 0], // only ribbed
    [!variation && 4, 1], // ribbed + lines
    [!variation && 2, 2], // only lines
    [!variation && 1, 3], // spiral
  )

  const gearStartFn = chance(
    [7, returnOne],
    [2, evenStart],
    [1, wonkyStart],
  )

  const shadow = prb(0.15)

  const rosetteLinesDashed = prb(0.25)


  if (leftRosette && !sectionFeatures.burnHere && !sectionFeatures.wheresGeorgeOverride) {
    const gears = generateGears(8, 15, rosetteRadia, gearStartFn)

    if (rosetteLines === 0 || rosetteLines === 1) {
      drawRibbedRosette(413, 350, 40, 10, {gears, rosetteRadiaChange, rosetteRotation, shadow})
    }
    if (rosetteLines === 1 || rosetteLines === 2) {
      if (rosetteLinesDashed) {
        times(10, i => {
          if (i%2 === 0) {
            drawLineRosette(413, 350, 60 + i*23, 60 + (i+1)*23-4, gears, { rosetteRadiaChange:0.01, shadow })
          }
        })
      } else {
        drawLineRosette(413, 350, 60, 260, gears, {shadow})
      }
    }
    if (rosetteLines === 3) {
      const rosettePath = getRosettePath(
        40,
        gears,
        6,
        0.0003
      )
      svg.drawPath(413, 350, rosettePath)
    }






    if (!variation && !rosetteLines) drawSections([1, 6, 7, 9], sectionFeatures)
  } else {
    drawSections([1, 2, 3, 4, 5, 6, 7, 8, 9], sectionFeatures)
  }


  if (rightRosette) {
    const gears = generateGears(8, 15, rosetteRadia, gearStartFn)
    if (rosetteLines === 0 || rosetteLines === 1) drawRibbedRosette(1305, 404, 60, 8, {gears, rosetteRadiaChange, rosetteRotation, shadow})
    if (rosetteLines === 1 || rosetteLines === 2) {
      if (rosetteLinesDashed) {
        times(8, i => {
          if (i%2===0) {
            drawLineRosette(1305, 404, 95 + i*22, 95 + (i+1)*22-4, gears, {shadow})
          }
        })
      } else {
        drawLineRosette(1305, 404, 95, 245, gears, {shadow})
      }
    }
    if (rosetteLines === 3) {
      const rosettePath = getRosettePath(
        40,
        gears,
        6,
        0.0002
      )
      svg.drawPath(1305, 404, rosettePath)
    }

    if (!variation && !rosetteLines) drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 16, 19], sectionFeatures)

  } else {
    drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], sectionFeatures)
  }


  if (centerRosette) {
    const gears = generateGears(8, 15, rosetteRadia)
    times(6, t => {
      const rad = (t+1)*14
      const rosettePath = getRosettePath(rad, gears)
      svg.drawPath(880, 316, rosettePath)

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
    svg.drawRect(1290, 590, 230, 40, {fill, stroke: 'none'})
    svg.text('STEVE PIKELNY', 215, 590, {size: 0.35})
    svg.text('STEVIEP.XYZ', 1300, 600, {size: 0.35})
  }

  if (sectionFeatures.wheresGeorgeOverride) {
    svg.drawRect(506, 215, 153, 235, {stroke: pen.red})
    svg.text('TRACK', 533, 228, {size: 0.35, stroke: pen.red})
    svg.text('ME AT', 533, 266, {size: 0.35, stroke: pen.red})
    svg.text('WWW.', 533, 304, {size: 0.35, stroke: pen.red})
    svg.text('WHERES', 515, 344, {size: 0.35, stroke: pen.red})
    svg.text('GEORGE', 515, 380, {size: 0.35, stroke: pen.red})
    svg.text('.COM', 533, 418, {size: 0.35, stroke: pen.red})
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


  if (sectionFeatures.cutHere) verticalCut()

  if (sectionFeatures.showHash)
    svg.text(tokenData.hash.toUpperCase(), 480, 57, {size: 0.2})


  if (isWorthless)
    worthless()

  if (prb(0.5))
    usaText(sample([pen.red, pen.orange, pen.teal, pen.pink]))
  // else if (prb(0.4))
  //   usaTxt(270, 68, highlighter.purple)



  const topHighlight = prb(0.5)
  const bottomHiglight = prb(0.5)
  const highlightColor = rndHighlighter()

  if (topHighlight) {
    bigOne(81, 98, highlightColor)
    bigOne(1604, 88, highlightColor)
  }
  if (bottomHiglight) {
    smallOne(1618, 553, highlightColor)
    smallOne(77, 548, highlightColor)
  }

  if (prb(0.05)) {
    bottomTxt(544, 632, highlightColor)
  }
  if (prb(0.05)) {
    topTxt(413, 7, highlightColor)
  }
  if (drawBoner) {
   boner()
  }


  if (randomSymbols) times(45, i => {
    prb(0.1)
      ? svg.text("$", rnd(50, 1700), rnd(50, 650))
      : drawSingleSymbol(rnd(50, 1700), rnd(50, 650), rndSymbolName())
  })


  if (drawGrid) {
    const xBars = rndint(15, 30)
    const stroke = sample(penColorsAll)
    times(xBars, t => {
      const x = (t+1)*svg.w/(xBars+1)

      svg.drawLine(x, 0, x, svg.h, {stroke})
    })

    const yBars = rndint(5, 10)
    times(yBars, t => {
      const y = (t+1)*svg.h/(yBars+1)

      svg.drawLine(0, y, svg.w, y, {stroke})
    })
  }



}






const rndText = (x, y) => chance(
  // [10000, () => {
  //   svg.text("INSTRUCTIONS", x+105, y-7,)
  //   svg.text("FOR DEFACEMENT", x+85, y+18,)
  // }],
  [1, () => svg.text("TIME = MONEY", x+35, y, {size: 0.45})],
  [1, () => svg.text("MONEY = SLAVERY", x+5, y, {size: 0.45})],
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
  [1, () => svg.text("BURN AFTER READING", x+55, y+10,)],
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
  [1, () => {
    svg.text("MAKE CASH FAST AT", x+50, y-10, {size: 0.3})
    svg.text("WWW.FASTCASHMONEYPLUS.BIZ", x-20, y+20, {size: 0.3})
  }],
  [1, () => {
    svg.text("CASH RULES", x+100, y-10, {size: 0.3})
    svg.text("EVERYTHING AROUND ME", x+20, y+20, {size: 0.3})
  }],
)()

const hArrows = (x, y) => chance(
  [1, () => {
    arrowWest(x+5, y+5, 0.8)
    arrowEast(x+352, y+52, 0.8)
  }],
  [1, () => {
    arrowWest(x+232, y+5, 0.8)
    svg.text('.', x+210, y+13)
    arrowEast(x+192, y+52, 0.8)
  }],
  [1, () => {
    arrowWest(x+72, y+10, 0.8)
    arrowEast(x+282, y+40, 0.8)
  }],
)()




// 5, 6, 17, 19

const sectionFns = {
  [0]: noop,
  [1]: (features) => {
    chance(
      [1, (features) => {
        svg.drawRect(630, 135, 230, 30)
        svg.text('1', 635, 142, {size: 0.2})
      }],
      [20, noop],
      [!features.cutHere && 2, () => svg.text(prb(0.5) ? 'SUCKS' : 'RULES', 800, 142, {size: 0.3})],
    )()


  },
  [2]: (features) => {
    if (!features.wheresGeorgeOverride) chance(
      [1, () => {
        svg.drawRect(248, 200, 430, 50)
        svg.text('2', 248+5, 200+2)
      }],
      [22, () => rndText(253, 213)],
      [5, () => hArrows(248, 200)],
      [2, noop],
    )()


  },
  [3]: () => {
    chance(
      [1, () => {
        svg.drawRect(263, 260, 55, 80)
        svg.text('3', 268, 262)
      }],
      [3, () => drawSingleSymbol(255, 295, rndSymbolName())],
      [8, noop],
    )()

  },
  [4]: (features) => {

    if (!features.wheresGeorgeOverride && !features.burnHere) chance(
      [1, () => {
        svg.drawRect(506, 265, 153, 185)
        svg.text('4', 511, 267)
      }],
      [16, () => {
        const sym = prb(0.4) ? rndSymbolName() : false
        times(3, x =>
          times(3, y => {
            drawSingleSymbol(495 + x*58, 273+y*60, sym || rndSymbolName())
          })
        )
      }],
      [4, () => {
        drawSingleSymbol(460 , 278, 'rosette', 4)
      }],
      [3, () => {
        drawSingleSymbol(435 , 263, 'one', 4)
      }],
      [3, () => {
        svg.text('$', 527, 255, {size: 3})
      }],
      [1, noop],
    )()

  },
  [5]: () => {
    chance(
      [1, () => {
        svg.drawRect(123, 352, 195, 100)
        svg.text('5', 128, 354)
      }],
      [7, () => {
        drawSingleSymbol(185, 363, rndSymbolName())
        arrowWest(242, 363, 0.5)
        arrowEast(189, 390, 0.5)
        arrowNorth(233, 410, 0.5)
        arrowSouth(202, 350, 0.5)
      }],
      [6, () => {
        const sym = prb(0.4) ? rndSymbolName() : false

        times(3, x =>
          times(2, y => {
            drawSingleSymbol(123 + x*58, 352+y*60, sym || rndSymbolName())
          })
        )
      }],
      [2, () => {
        prb(0.5)
          ? svg.drawPath(123, 352, dick, {size: 0.5})
          : svg.drawPath(300, 430, dick, {size: 0.5, rotation: 180})
      }],
      [1, noop]
    )()

  },
  [6]: () => {
    chance(
      [1, () => {
        svg.drawRect(123, 461, 76, 40)
        svg.text('6', 128, 463)
      }],
      [3, () => {
        drawSingleSymbol(128, 468, rndSymbolName())
      }],
      [10, noop]
    )()
  },
  [7]: (features) => {
    if (!features.isStarNote) {
      chance(
        [20, noop],
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
      [2, () => {
        svg.text(times(8, () => rndint(10)).join('') + rndChar(), 255, 512, {size: 0.6, stroke: pen.green })
      }],
      [2, () => {
        svg.text('$$$$$$$$', 255, 512, {size: 0.6, stroke: pen.green })
      }],
      [1, noop]
    )()
  },
  [9]: (features) => {
    if (!features.isBizCard) {
      chance(
        [1, () => {
          svg.drawRect(186, 588, 100, 40)
          svg.text('9', 191, 590)
        }],
        [3, () => svg.text('ID ' + tokenData.tokenId, 220, 600, {size: 0.4})],
        [3, noop],
        [3, () => {
          drawSingleSymbol(200, 595, rndSymbolName())
        }]
      )()
    }

  },
  [10]: (features) => {
    if (!features.cutHere && prb(0.05)) {
      svg.drawRect(885, 135, 220, 30)
      svg.text('10', 890, 137, {size: 0.2})
    }

  },
  [11]: () => {
    chance(
      [1, () => {
        svg.drawRect(1110, 135, 380, 50)
        svg.text('11', 1115, 137)
      }],
      [2, () => {
        svg.text(rndChar() + times(8, () => rndint(10)).join('') + rndChar(), 1117, 143, {size: 0.6, stroke: pen.green })
      }],
      [2, () => {
        svg.text('$$$$$$$$$$', 1110, 143, {size: 0.6, stroke: pen.green })
      }],
      [1, noop]
    )()


  },
  [12]: () => {
    chance(
      [5, noop],
      [1, () => {
        svg.drawRect(1065, 179, 45, 55)
        svg.text('12', 1070, 181)
      }],
      [6, () => drawSingleSymbol(1053, 187, rndSymbolName())],
    )()

  },
  [13]: (features) => {
    if (!features.isStarNote) {
      chance(
        [1, noop],
        [1, () => {
          svg.drawRect(1475, 191, 35, 100)
          svg.text('13', 1475+5, 191+2)
        }],
      )
    }

  },
  [14]: () => {
    chance(
      [4, noop],
      [1, () => {
        svg.drawRect(1078, 241, 100, 240)
        svg.text('14', 1083, 243)
      }],
      [2, () => {
        drawSingleSymbol(1090, 263, rndSymbolName())
        svg.drawPath(1150, 333, dick, {size: 0.4, rotation: 90})
      }],
      [2, () => {
        drawSingleSymbol(1090, 263, rndSymbolName())
        svg.drawPath(1100, 463, dick, {size: 0.4, rotation: 270})
      }],
      [6, () => {
        drawSingleSymbol(1100, 436, rndSymbolName())
        arrowSouth(1108, 426, 0.8)
      }],
      [6, () => {
        drawSingleSymbol(1073, 278, rndSymbolName())
        arrowNorth(1133, 337, 0.8)
      }],
    )()



  },
  [15]: () => {
    chance(
      [5, () => {
        svg.drawRect(1189, 241, 275, 60)
        svg.text('15', 1189+5, 241+2)
      }],
      [10, () => svg.text('MARFA,TX', 1200, 250, {size: 0.5, stroke: pen.red})],
      [85, noop]
    )()
  },
  [16]: () => {
    chance(
      [1, () => {
        svg.drawRect(1525, 261, 54, 76)
        svg.text('16', 1527, 263)
      }],
      [3, () => drawSingleSymbol(1507, 263, rndSymbolName())],
      [10, noop],

    )()
  },
  [17]: () => {
    chance(
      [1, () => {
        svg.drawRect(1450, 348, 150, 115)
        svg.text('17', 1455, 350)
      }],
      [15, () => {
        const sym = prb(0.4) ? rndSymbolName() : false

        times(2, x =>
          times(2, y => {
            drawSingleSymbol(1470 + x*58, 348+y*60, sym || rndSymbolName())
          })
        )
      }],
      [8, () => {
        const sym = prb(0.4) ? rndSymbolName() : false
        drawSingleSymbol(1455, 360, rndSymbolName(), 2.5)
      }],
      [3, noop]
    )()
  },
  [18]: () => {
    chance(
      [1, () => {
        svg.drawRect(1109, 497, 465, 35)
        svg.text('18', 1114, 500)
      }],
      [22, () => rndText(1114, 505)],
      [5, () => hArrows(1109, 497)],
      [2, noop],
    )()
  },
  [19]: (features) => {
    if (!features.isBizCard) {


    chance(
      [1, () => {
        svg.drawRect(1443, 590, 115, 40)
        svg.text('19', 1448, 592)
      }],
      [3, () => {
        drawSingleSymbol(1480, 590, rndSymbolName())
      }],
      [10, noop]
    )()





    }


  },
}







function drawSections(sections, features) {
  sections.forEach(s => s !== false && sectionFns[s](features))
}


function cut(x1, y1, x2, y2, stroke) {
  const {d, angle} = lineStats(x1, y1, x2, y2)

  let x = x1
  let y = y1
  for (let i=0; i < d; i+= 27) {
    const [_x, _y] = getXYRotation(angle, 18, x, y)
    svg.drawLine(x, y, _x, _y, {stroke})
    ;([x, y] = getXYRotation(angle, 27, x, y))
  }
}

function boner() {
  svg.text("B", 510, 633, { size: 0.85, strokeWidth: 12/0.85})
  svg.text("R", 765, 633, { size: 0.85, strokeWidth: 12/0.85})

  svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12})
  svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12})
  svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12})
}

function worthless() {
  svg.text("WORTHLESS",300, 450, { size: 2, strokeWidth: 6, stroke: sample([pen.black, pen.red, pen.green, pen.blue])})

}

function verticalCut() {
  const xOff = rnd(-300, 300)
  const stroke = pen.black
  cut(872+xOff, 0, 872+xOff, 702, stroke)


  arrowWest(885+xOff, 140, 0.3, stroke)

  svg.text(prb(0.75) ? 'CUT HERE' : 'RIP HERE' , 950+xOff, 140, {stroke})

}


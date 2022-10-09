function layout(svg) {

  // SECTION 1
  svg.drawRect(630, 135, 230, 30)

  // SECTION 2
  svg.drawRect(885, 135, 220, 30)

  // SECTION 3
  svg.drawRect(1110, 135, 380, 50)

  // SECTION 4
  svg.drawRect(248, 200, 430, 50)

  // SECTION 5
  svg.drawRect(263, 260, 55, 80)

  // SECTION 6
  svg.drawRect(506, 265, 153, 185)

  // SECTION 7
  svg.drawRect(878, 240, 62, 33)

  // SECTION 8
  svg.drawRect(1078, 241, 100, 240)


  // SECTION 9
  svg.drawRect(1189, 241, 275, 19)

  // SECTION 10
  svg.drawRect(1525, 261, 54, 76)

  // SECTION 11
  svg.drawRect(123, 352, 195, 100)

  // SECTION 12
  svg.drawRect(1450, 348, 150, 115)

  // SECTION 13
  svg.drawRect(578, 461, 73, 42)

  // SECTION 14
  svg.drawRect(250, 510, 390, 35)

  // SECTION 15
  svg.drawRect(1109, 497, 465, 35)

  // SECTION 16
  svg.drawRect(186, 588, 100, 40)

  // SECTION 17
  svg.drawRect(1443, 590, 115, 40)


  // SECTION 18
  svg.drawRect(1475, 191, 35, 100)


  // SECTION 19
  const r19 = drawRect(1065, 179, 45, 55)
  svg.appendChild(r19)

  // SECTION 20
  const r20 = drawRect(123, 461, 76, 40)
  svg.appendChild(r20)




  verticalCut()
  boner()

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
    svg.text("B", 510, 630, { size: 0.85, strokeWidth: 12})
    svg.text("R", 765, 630, { size: 0.85, strokeWidth: 12})

    svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12})
    svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12})
    svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12})


  }

  function verticalCut() {
    cut(872, 0, 872, 702)


    arrowWest(885, 140, 0.3)

    svg.text("CUT HERE", 950, 140)

  }

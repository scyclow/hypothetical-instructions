function calculateFeatures(tokenData) {




  /////// UTILS



  const PI = Math.PI
  const TWO_PI = Math.PI * 2
  const HALF_PI = Math.PI/2
  const QUARTER_PI = Math.PI/4
  const int = parseInt
  const min = Math.min
  const max = Math.max
  const sin = Math.sin
  const cos = Math.cos
  const abs = Math.abs
  const atan2 = Math.atan2
  const dist = (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2)**2 + Math.abs(y1 - y2)**2)


  let __randomSeed = int(tokenData.hash.slice(50, 58), 16)
  function rnd(mn, mx) {
    __randomSeed ^= __randomSeed << 13
    __randomSeed ^= __randomSeed >> 17
    __randomSeed ^= __randomSeed << 5
    const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
    if (mx != null) return mn + out * (mx - mn)
    else if (mn != null) return out * mn
    else return out
  }

  const rndint = (mn, mx) => int(rnd(mn, mx))
  const prb = x => rnd() < x
  const posOrNeg = () => prb(0.5) ? 1 : -1
  const sample = (a) => a[int(rnd(a.length))]
  const exists = x => !!x
  const last = a => a[a.length-1]
  const noop = () => {}

  function times(t, fn) {
    const out = []
    for (let i = 0; i < t; i++) out.push(fn(i))
    return out
  }

  const lineStats = (x1, y1, x2, y2) => ({
    d: dist(x1, y1, x2, y2),
    angle: atan2(x2 - x1, y2 - y1)
  })

  function getXYRotation (deg, radius, cx=0, cy=0) {
    return [
      sin(deg) * radius + cx,
      cos(deg) * radius + cy,
    ]
  }

  function chance(...chances) {
    const total = chances.reduce((t, c) => t + c[0], 0)
    const seed = rnd()
    let sum = 0
    for (let i = 0; i < chances.length; i++) {
      const val =
        chances[i][0] === true ? 1
        : chances[i][0] === false ? 0
        : chances[i][0]
      sum += val / total
      if (seed <= sum && chances[i][0]) return chances[i][1]
    }
  }

  const rndChar = () => sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))




  ///////// SVG


  class SVG {
    constructor(xin = 5.8125, yin = 2.34252, hideBg = null) {
      const dpi = 300
      this.layers = {}
      this.w = xin * dpi
      this.h = yin * dpi
      this.svg = {}


      this.chaos = chance(
        [97, 0],
        [3, rnd(15, 64)],
      )

      // append the document bounds

    }

    chaosFn() {
      return rnd(-this.chaos,this.chaos)
    }

    mount() {
      // Object
      // .keys(this.layers)
      // .sort((a, b) => a.includes('none') ? -1 : 1)
      // .forEach(layerKey => {
      //   const g = this.drawG(this.layers[layerKey])
      //   if (!layerKey.includes('none')) g.setAttribute('id', layerKey)

      // })
      // document.body.appendChild(this.svg)

      FEATURES['Pen Count'] = Object.keys(this.layers).length
      if (Object.keys(this.layers).some(k => k.includes('none'))) {
        FEATURES['Manual Highlight'] = true
        FEATURES['Pen Count'] -= 1
      }
    }

    addToLayer(el, stroke, strokeWidth) {
      const key = stroke+'-'+Math.round(strokeWidth)
      if (this.layers[key]) this.layers[key].push(el)
      else this.layers[key] = [el]

    }

    appendChild(n) {
      this.svg.appendChild(n)
    }


    drawPath(x, y, d, args={}) {
      const isLetter = args.isLetter || false
      const fill = args.fill || 'none'
      const fillOpacity = args.fillOpacity || 0.65
      const size = args.size || 1.5
      const stroke = args.stroke || penBase
      const rotation = args.rotation || 0
      const strokeWidth = args.strokeWidth || 3 * 1.5/size
      const className = args.className || ''
      const ignoreMount = args.ignoreMount || false
      const path = {}


      if (!isLetter) {
        x += this.chaosFn()
        y += this.chaosFn()
      }


      if (!ignoreMount) this.addToLayer(path, stroke, strokeWidth/1.5*size)
      return path
    }



    drawLine(x1, y1, x2, y2, args={}) {
      const strokeWidth = args.strokeWidth || 4
      const stroke = args.stroke || penBase
      const line = {}
      this.chaosFn()
      this.chaosFn()
      this.chaosFn()
      this.chaosFn()
      this.addToLayer(line, stroke, strokeWidth*2/3)
      return line
    }

    drawRect(x, y, w, h, args={}) {
      const f = args.fill || 'none'
      const strokeWidth = args.strokeWidth || 5
      const stroke = args.stroke || penBase

      const fill = {}
      this.chaosFn()
      this.chaosFn()
      this.addToLayer(fill, stroke, strokeWidth*3/5)
      return fill
    }

    drawCircle(x, y, r, args={}) {
      const stroke = args.stroke || penBase
      const fill = args.fill || 'none'
      const strokeWidth = args.strokeWidth || 5

      const c = {}
      this.chaosFn()
      this.chaosFn()
      this.addToLayer(c, stroke, strokeWidth*3/5)

    }



    text(str, x, y, args={}) {
      const size = args.size || 0.3
      const stroke = args.stroke || penBase
      const strokeWidth = args.strokeWidth || 3 * 1.5/size

      const characters = str.split('')
      const charPaths = []

      x += this.chaosFn()
      y += this.chaosFn()
      const isLetter = !(this.chaos && prb(0.35))

      const g = {}

      const children = characters.map((c, i) => {
        const charPath = svg.drawPath(
          x,
          y,
          '',
          { isLetter, size, stroke, ignoreMount: true, ...args}
        )

        return charPath
      })

      this.addToLayer(g, stroke, strokeWidth/1.5*size)

      return g
    }
  }





  /////// COLORS


  const highlighter = {
    red: '#fc35b4',
    green: '#09f949',
    blue: '#09d1f9',
    orange: '#ff8100',
    yellow: '#e3ff00',
    purple: '#8d4dd6',
  }
  const rndHighlighter = () => sample([
    highlighter.red,
    highlighter.green,
    highlighter.blue,
    highlighter.orange,
    highlighter.yellow,
    highlighter.purple,
  ])

  const pen = {
    black: '#000',
    red: '#f32e14',
    blue: '#1f1dcb',
    pink: '#f36ee8',
    orange: '#fa6405',
    green: '#007344',
    teal: '#00b0d9'
  }

  const penColorsDark = [
    pen.blue,
    pen.green,
    pen.teal,
    pen.red,
  ]

  const penColorsLight = [
    pen.pink,
    pen.orange,
  ]

  const penColors = [...penColorsDark, ...penColorsLight]
  const penColorsAll = [pen.black, ...penColors]
  const penBase = chance(
    [80, pen.black],
    [5, pen.blue],
    [5, pen.green],
    [5, pen.teal],
    [5, pen.red],
  )





  ////////// ROSETTE

  const returnOne = () => 1
  const wonkyStart = () => rnd(0, 1)
  const evenStart = () => prb(0.5) ? 0 : 0.5
  function generateGears(gearsN=8, rotationMax=15, radia=0.1, startFn=returnOne) {
    const gears = [
      {
        rotation: 1,
        radia: 1,
        radiaStart: 1,
        radiaAdj: (p, i, _x, _y, baseRadius, prevRadius) => i ? 1 : (p%2 ? 1 : prevRadius/baseRadius),
      },
      ...times(gearsN - 1, g => ({
        rotation: int(rnd(-rotationMax, rotationMax)),
        radia: rnd(0, radia),
        radiaStart: startFn(),
        radiaAdj: (p, i, _x, _y, baseRadius, prevRadius) => i ? 1 : (p%2 ? 1 : prevRadius/baseRadius),
      }))
    ]

    const totalRadia = gears.reduce((sum, g) => g.radia + sum, 0)
    return gears.map(g => ({
      ...g,
      radia: g.radia/totalRadia
    }))
  }


  function createSpirographFn(baseRadius, prevRadius, gears) {
    let c = 0
    return (progress, p, increase=0) => gears.reduce(([_x, _y], gear, i) => {
      let a = 0
      if (i===0) {
        c += increase
        a = c
      } else {
        a = c* 0.5
      }
      return getXYRotation(
        (progress + gear.radiaStart % 1) * TWO_PI * gear.rotation,
        (1+a)* baseRadius * gear.radia * gear.radiaAdj(p, i, _x, _y, baseRadius, prevRadius),
        _x,
        _y
      )
    }
      ,
      [0, 0]
    )
  }

  function getRosettePath(rad, gears, cycles=1, spacing=0, startOffset=0) {
    const pointCount = 900
    const spirographFn = createSpirographFn(rad, rad, gears)
    const points = times(
      (cycles*pointCount+1),
      p => {
        const _p = p + (pointCount*startOffset)
        return spirographFn(
          _p/(pointCount+1),
          _p,
          spacing*_p/pointCount
        )
      }
    )
    let d = `M ${points[0][0]} ${points[0][1]} `
    for (let i=0; i<points.length; i++) {
      d += ` ${points[i][0]},${points[i][1]}`
    }
    if (cycles === 1) d += ` ${points[0][0]},${points[0][1]}`
    // console.log(d)

    return d
  }

  const shadowColor = sample(penColors)

  function drawRibbedRosette(x, y, minRad, layers, {gears, rosetteRadiaChange, rosetteRotation, ...args}) {
    if (args.shadow) {
      drawRibbedRosette(x-2, y-2, minRad, layers, {
        gears,
        rosetteRadiaChange,
        rosetteRotation,
        ...args,
        shadow: false,
        stroke: shadowColor,
      })
    }

    times(layers, t => {
      const rad = t*15 + minRad
      const rosettePath = getRosettePath(
        rad,
        gears.map(g => ({ ...g, radia: g.radia - (t*rosetteRadiaChange)}))
      )

      svg.drawPath(x, y, rosettePath, {rotation: t*rosetteRotation, ...args})
    })
  }

  function drawLineRosette(x, y, minRad, maxRad, gears, args) {
    if (args.shadow) drawLineRosette(x, y, minRad, maxRad, gears, { stroke: shadowColor, ...args, shadow: false })
    const pointCount = 100
    const innerSpirographFn = createSpirographFn(minRad, minRad, gears)
    const outterSpirographFn = createSpirographFn(maxRad, maxRad, gears)
    const innerPoints = times(pointCount, p => innerSpirographFn(p/pointCount, p))
    const outterPoints = times(pointCount, p => outterSpirographFn(p/pointCount, p))
    innerPoints.forEach(([x1, y1], i) => {
      const [x2, y2] = outterPoints[i]
      svg.drawLine(x1+x, y1+y, x2+x, y2+y, args)
    })
  }






  ////////// GEORGE

  const drawn = {}
  const bowPath = 'M34.25 16.25L66.5 3V29.5L34.25 16.25ZM34.25 16.25L2 29.5V3L34.25 16.25ZM39 16C39 18.2091 37.5637 19.2408 34.25 19.2408C30.9363 19.2408 29 18.2091 29 16C29 13.7909 30.9363 13.2392 34.25 13.2392C37.5637 13.2392 39 13.7909 39 16Z'
  const heartOutline = 'M53.5297 19C55.7548 13.8277 63 16.0492 63 7.65301C63 -0.743188 56.2441 1.02626 53.5297 7.65301C50.8691 0.469987 44.9196 0.516622 44.0588 7.65303C43.1981 14.7894 52.0421 15.5634 53.5297 19Z'

  const glasses = (x, y, fill) => (drawn.glasses = true, svg.drawPath(x, y, 'M23 1.50149V19.5015H52V1.50149M23 1.50149H52M23 1.50149L0.5 5.49984M52 1.50149C60.0197 0.553727 63.9513 0.877725 69.5 3.50149M69.5 3.50149V17.5015H89.5V3.50149M69.5 3.50149H89.5M89.5 3.50149H94.5', {fill}) )
  const noseRing = (x, y) => (drawn.noseRing = true, svg.drawPath(x, y, 'M2.44092 1C-1.3 14.6058 20.1694 9.5819 13.9409 1') )
  const earring = (x, y) => (drawn.earring = true, svg.drawPath(x, y, 'M5.5 1.5C-5.5 12 17.5 16 11 3') )
  const thinStache = (x, y) => (drawn.thinStache = true, svg.drawPath(x, y, 'M25 1.5C26.3347 3.82597 29.8023 5.41655 39 8.5M19.5 1.5C14.2064 5.74858 9.52486 6.27014 1 7') )
  const curlyStache = (x, y) => (drawn.curlyStache = true, svg.drawPath(x, y, 'M25.0013 7C6.47068 11.0113 1.78334 9.45917 2.00131 0.5M35.5013 7C43.8097 8.9582 47.6376 9.15325 48.0013 2.5') )
  const walrusStache = (x, y) => (drawn.walrusStache = true, svg.drawPath(x, y, 'M2 16L6.5 5V15.2297L11 5L10.5 15L15 5V15L19 5L19.5 14.5L22.5 7L23.5 13.5L26.5 7L27.5 13.5L30 7.5L31.5 13.5L33.5 7L35.5 13.5L36.5 6L40 14V5.5L44.5 16') )
  const xEyes = (x, y) => (drawn.xEyes = true, svg.drawPath(x, y, 'M2 2L16 17M2 17L16 2M45.5 2L58.5 16M45.5 15L59.5 3') )
  const tongue = (x, y) => (drawn.tongue = true, svg.drawPath(x, y, 'M1.5 2C8 21 26 16.5 13 2M8.5 3.5L12 9') )
  const heartEyes = (x, y) => (drawn.heartEyes = true, svg.drawPath(x, y, heartOutline + 'M10 16.5L20 9L17 3.5L12.6738 9.71888M12.6738 9.71888L10.3233 13.0977M12.6738 9.71888L11 10.5L6.5 3.5L3 8L9 15L10.3233 13.0977M12.6738 9.71888L18.5 7L11 14L10.3233 13.0977M10.3233 13.0977L5 6M52 16.5L62 9L59 3.5L54.6738 9.71888M54.6738 9.71888L52.3233 13.0977M54.6738 9.71888L53 10.5L48.5 3.5L45 8L51 15L52.3233 13.0977M54.6738 9.71888L60.5 7L53 14L52.3233 13.0977M52.3233 13.0977L47 6M11.5297 19C13.7548 13.8277 21 16.0492 21 7.65301C21 -0.743188 14.2441 1.02626 11.5297 7.65301C8.8691 0.469987 2.91961 0.516622 2.05884 7.65303C1.19807 14.7894 10.0421 15.5634 11.5297 19Z', {stroke: pen.red}) )
  const monocole = (x, y) => (drawn.monocole = true, svg.drawPath(x, y, 'M8.64934 14.9907C0.665386 80.9926 -0.171216 103.715 8.64934 103.991M34.5 14.5C34.5 21.4036 28.6797 27 21.5 27C14.3203 27 8.5 21.4036 8.5 14.5C8.5 7.59644 14.3203 2 21.5 2C28.6797 2 34.5 7.59644 34.5 14.5Z') )
  const smile = (x, y) => (drawn.smile = true, svg.drawPath(x, y, 'M2 0.5C9 24.5 45 27.5 52.5 0.5') )
  const frown = (x, y) => (drawn.frown = true, svg.drawPath(x, y, 'M2 14.5C14.5 -3 42 -2.5 51 14.5') )
  const openMouth = (x, y) => (drawn.openMouth = true, svg.drawPath(x, y, 'M34.0082 9.24C33.8817 -0.880564 1.65107 0.0684443 2 9.24M34.0082 9.24C34.1347 19.3519 2.35465 18.4029 2 9.24M34.0082 9.24C23.502 2.73828 14.002 3.23828 2 9.24M34.0082 9.24C22.3956 15.4646 15.492 15.7175 2 9.24M34.0082 9.24C21.8452 6.6788 14.7947 6.86681 2 9.24M34.0082 9.24C21.5215 11.6867 14.5138 11.6473 2 9.24M34.0082 9.24H2') )
  const cigarette = (x, y) => (drawn.cigarette = true, svg.drawPath(x, y, 'M19.5 29C19.5 23 20 18.5 24.5 15C29 11.5 29 5 27.5 0.5M4 21.5L15 35.5L17 34.5L6.5 21.5H4Z') )
  const angry = (x, y) => (drawn.angry = true, svg.drawPath(x, y, 'M1 2L32 14M45 14L66 5') )
  const worried = (x, y) => (drawn.worried = true, svg.drawPath(x, y, 'M1 10L28.5 1.5M46.5 3L68 11') )
  const devilHorns = (x, y, fill) => (drawn.devilHorns = true, svg.drawPath(x, y, 'M35.4914 75C7.14021 72.8917 -9.90881 24.6777 11.4938 2C0.523006 10.6718 18.5087 52.354 45.4922 53.5M112.992 58.5C127.411 57.4814 141.448 35.5505 138.492 18.5C148.962 31.8447 139.501 71.284 123.492 75', {fill}) )
  const laserEyes = (x, y, stroke) => (drawn.laserEyes = true, svg.drawPath(x, y, 'M52 225.5L5.5 9.5M5.5 9.5L82.5 249M5.5 9.5L63 225.5M132 231L51 9.5M51 9.5L167 249M51 9.5L144 225.5M4 3.5C4 3.5 4.82145 7.38905 0.5 7.5C4.47272 6.96133 5.63473 8.84932 2 13.5C4.98321 9.6911 6.55394 9.41585 9 15.5C6.44207 10.1092 6.64295 8.14132 13 8.5C7.89073 8.13069 6.96761 6.93684 10.5 2C7.91268 6.15767 4 3.5 4 3.5ZM49 4.5C48.3386 6.7922 46.4553 7.45798 44.5 7C47.2433 8.06978 47.115 9.12035 45 11.5C47.4353 9.91167 49.2133 11.0369 50 13.5C48.3994 10.1406 50.299 8.59907 53.5 7C50.3831 9.25969 48.7515 8.82817 49 4.5Z', {stroke}) )
  const mohawk = (x, y, fill) => (drawn.mohawk = true, svg.drawPath(x, y, 'M30.5 121.498C59.8854 100.262 77.878 91.0917 117.5 113L146 38.5L102.5 87L117.5 1.5L81.5 82L70.5 5L61.5 82L36.5 19.5L43 90.5L14 46L30.5 95.5L2 73.5L30.5 121.498Z', {fill}) )
  const teardrops = (x, y) => (drawn.teardrops = true, svg.drawPath(x, y, 'M3.51603 12.5C2.01664 9.5 4.09322 7.2308 5.51603 5C5.97198 8.34368 9.01586 9.5 9.01603 12.5C9.01619 15.5 5.01541 15.5 3.51603 12.5ZM2.49945 26.5C2.00029 24 2.85254 21.9254 4.49572 20C5.55425 23.2727 7.50007 24 7.5 26.5C7.49993 29 2.99862 29 2.49945 26.5Z') )
  const bowtie = (x, y) => (drawn.bowtie = true, svg.drawPath(x, y, bowPath) )
  const hairBow = (x, y) => (drawn.hairBow = true, svg.drawPath(x, y, bowPath, { rotation: -30}) )
  const tie = (x, y) => (drawn.tie = true, svg.drawPath(x, y, 'M23 27.5518L44 58.5518L46.5 100.5M23 27.5518C20.0707 27.3425 17.3926 27.5859 16.5 27.5518M23 27.5518C26.6937 20.2811 28.7889 16.2464 29.6107 10.5M12 27.5518L10 58.5518L19 97.0518M12 27.5518C11.66 26.8293 11.3269 26.1235 11 25.4307M12 27.5518C16.0707 27.261 15.2596 27.5043 16.5 27.5518M14.5 33L23 36L16.5 41L28.5 44.5L16.5 50.5L34 55L13.5 61.5L40.5 63L16.5 69.5L41.5 70.5L19 76.5L41.5 80L21 85L39.5 88.5L25 93.5L38 98.5M4.86895 11.5C3.88301 8.92111 2.93552 6.16805 2 3.05108C6.04551 2.30195 9.43946 1.95633 12.6733 2.0044M4.86895 11.5L12.6733 2.0044M4.86895 11.5C5.86794 14.113 6.9064 16.5472 8.01188 19M12.6733 2.0044C17.1538 2.071 21.327 2.89333 26.5 4.44528M8.01188 19L20 3.05108M8.01188 19C8.95361 21.0894 9.94397 23.1923 11 25.4307M11 25.4307L26.5 4.44528M26.5 4.44528C27.6158 4.78002 28.7781 5.14871 30 5.55108C29.9535 7.37685 29.8257 8.99697 29.6107 10.5M16.5 27.5518L29.6107 10.5') )
  const chinBeard = (x, y) => (drawn.chinBeard = true, svg.drawPath(x, y, 'M91 12V35L87.5 20.5V46.5L82.5 27.5V50L78 31L79 53L73.5 35L74.5 56.5L69 37.5L69.5 59.5L63.5 39V61L59 39L57.5 62.5L53.5 39L51 61L48 39L45 59.5L42.5 37.5L39.5 58L36.5 36L33.5 54.5L31 33L29 51L26 29L24.5 48L20 26L18.5 43.5L15.5 22L13.5 36L10.5 16.5L8.5 31L6.5 7.5L4 26L2 1') )
  const soulPatch = (x, y) => (drawn.soulPatch = true, svg.drawPath(x, y, 'M3.5 2.5C8.88348 3.27947 9.15105 2.99096 12 2.5C9.86017 5.50735 9.68905 5.84348 8 10.5C6.51783 6.18994 6.65564 6.71404 3.5 2.5ZM3.5 2.5L10 6') )
  const goatee = (x, y) => (drawn.goatee = true, svg.drawPath(x, y, 'M4.49812 7.00882C9.99614 2.50988 17.7537 2.02124 28.4981 2.5C39.1787 1.8117 46 3.00692 48.9981 11.5088C51.9963 20.0107 42.5 43.0069 42.5 43.0069L39.5 33.5069L38.5 45.5088L34.5 34.0069L31.5 45.5088L28.4981 35.0088L26 45.5088L22.5 35.0088L20 45.5088L16.9981 35.0088L15.4981 45.5088L10.4981 35.0088C4.11023 24.7905 -0.999901 11.5078 4.49812 7.00882Z') )
  const eyePatch = (x, y) => (drawn.eyePatch = true, svg.drawPath(x, y, 'M23.0001 15.997C19.9977 40.997 50.9969 41.497 47.5001 15.997M23.0001 15.997C32.7463 14.0114 37.6347 13.7655 47.5001 15.997M23.0001 15.997L1 12M47.5001 15.997L93.5 2M31.5 24H39M24 18.5C32.7618 16.8059 37.7341 16.9531 46.5 18.5C44 35.5 28.5 38 24 18.5ZM27.5 20.5C33.7716 19.5876 37.2284 19.581 43.5 20.5C39 32.5 31.5 32 27.5 20.5ZM30 23C32.9241 22.0567 38.0752 22.1651 41 23C36.7012 27.5628 34.2774 27.7941 30 23Z') )
  const hair = (x, y, fill) => (drawn.hair = true, svg.drawPath(x, y, 'M76.4987 127.002L73.9987 144.502L52.4987 129.002L34.4987 125.002C-6.26369 98.7738 -10.3728 86.7305 21.4987 71.002C16.5703 61.8103 16.6944 56.8903 26.9987 49.002C21.3345 34.4677 29.2392 27.9147 54.9987 18.5C56.4919 8.85742 68.8951 3.05579 107.499 0C140.018 11.4531 155.45 27.3508 173.499 65.502L190.999 101.002C195.667 113.1 186.133 121.538 166.499 134.002C163.75 131.54 170.9 103.681 163.999 85.002C165.44 67.4975 163.99 57.7337 155.499 40.502C138.812 24.2123 131.278 20.8479 122.499 30.0019C94.7677 22.4173 81.8787 20.2506 84.4987 36.502C81.7407 49.5935 82.7571 54.6747 90.9987 58.502C77.1751 65.7495 75.8465 73.9812 73.9987 89.002L76.4987 127.002Z', {fill}) )
  const blouse = (x, y, fill) => (drawn.blouse = true, svg.drawPath(x, y, 'M26.4975 65.5C1.03585 35.826 -2.27449 22.1124 2.4975 0.5C37.9897 53.9867 59.2908 60.4162 89.9975 42.5V61L102.998 69V88.5L112 98.5L126 147L108.998 160.5C90.4454 152.554 78.5551 149.768 53.4975 149.5L35.5 102L23 83L26.4975 65.5Z', {fill}) )
  const mouthDick = (x, y, fill) => (drawn.mouthDick = true, FEATURES['Dick Count'] += 1, svg.drawPath(x, y, dick, {size: 0.4}) )
  const lips = (x, y, fill) => (drawn.lips = true, svg.drawPath(x, y, 'M2 9.99855C2 2.49961 16 -1 22 5.49904C29.5 -0.000823498 39.5 4.9997 37 10.9961M2 9.99855C17.9928 20.5673 25.0753 18.2676 37 10.9961M2 9.99855C22.5762 9.4183 29.6245 9.29665 37 10.9961') )
  const eyeLashes = (x, y, fill) => (drawn.eyeLashes = true, svg.drawPath(x, y, 'M6.5 11.5L1.5 6.5M12 8L9.5 1.5M19.5 8L20.5 1.5M25 9.5L29 4.5M8.5 17L6.5 22.5M14 17L13.5 22.5M19.5 16.5L20.5 21.5M24.5 16L27 20M54 10L52.5 5.5M58.5 8V3.5M62.5 8L64 4M66.5 9.5L69 7M54.5 15L53 17.5M58.5 16.5V20M62.5 16L63 19M65.5 15L68 17') )
  const crossNecklace = (x, y) => (drawn.crossNecklace = true, svg.drawPath(x, y, 'M2 1C34.9011 50.5943 55.0319 73.7645 69 72.6721M89.5 43C83.9907 61.9287 77.6872 71.9928 69 72.6721M69 72.6721V108.5M59.5 85.5H78.5') )
  const buckTeath = (x, y) => (drawn.buckTeath = true, svg.drawPath(x, y, 'M2.49911 0.5C1.44883 10.7107 11.4651 10.8965 11 0.5C10.8793 10.3154 19.5 10.5 18.5 0.5') )
  const headband = (x, y) => (drawn.headband = true, svg.drawPath(x, y, 'M3.51294 10C3.19192 11.5842 2.16424 12.3208 2.50022 14C59.6424 16.6836 89.0307 15.8141 138.501 13C138.461 11.4789 138.117 11.4286 137.013 9.5M3.51294 10C59.3175 12.7821 86.7976 12.0855 137.013 9.5M3.51294 10C4.0438 7.38021 4.51292 8 5.51292 5.5M137.013 9.5C135.976 7.68798 136.2 8.55162 133.514 5.5M5.51292 5.5C7.70701 3.2704 6.56305 3.01461 10.0129 2C55.9138 5.51114 87.5951 5.40263 130.013 2C131.792 3.88855 132.228 4.03965 133.514 5.5M5.51292 5.5C55.8989 9.26729 85.1925 9.219 133.514 5.5') )
  const headphones = (x, y) => (drawn.headphones = true, svg.drawPath(x, y, 'M11 74C11 -30.5 142 -13.5 131.5 77.5M11 74C19.76 74.76 22.6 77.62 24 87C23.834 93.635 17.5 97 11 97C4.5 97 1.5 91 1.5 85.5C1.5 80 5.036 76.5 11 74ZM131.5 77.5C129.1 85.36 130.331 93.8764 131.5 97.5C132.669 101.12 135.245 86.4034 131.5 77.5ZM12.5 78C16 78 19.5 82.5 19.5 85.5C19.5 88.5 17 92.5 12.5 92.5C8 92.5 6 88.5 6 85.5C6 82.5 9 78 12.5 78ZM12.5 82C14.469 82.7096 15.3538 83.4413 15.5 84.9929C15.5972 87.4885 14.3499 87.5467 12.5 88C10.9347 87.7131 10.6689 87.7331 10 85C10.4812 83.0244 10.2989 81.9706 12.5 82Z') )
  const muttonChops = (x, y) => (drawn.muttonChops = true, svg.drawPath(x, y, 'M98 54L93 51L99.5 49L96.5 47L101 44.5L98 41.5L102.5 40.5L99.5 36.5L102.5 34L99.5 30L102.5 28.5L99.5 25.5L102.5 23M3.5 2H9L5.5 7.5H10.5L5.5 13.5L12.5 12.5L7 18.5L14.5 17L5.5 26L17.5 23.5L7 34L21.5 28.5L7 40.5L24.5 34L10.5 45.5L28 39L14.5 51.5L32.5 44L17.5 56.5L36.5 48L21.5 59.5') )



  const clownNose = (x, y) => {
    drawn.clownNose = true
    times(7, i => {
      svg.drawCircle(x, y, i*3, {stroke: i===6? pen.black : pen.red})
    })
  }
  const gag = (x, y) => {
    drawn.gag = true
    svg.drawPath(x, y, 'M1 1.5C49.5 19.5 72.499 18.408 91.5 9.5')
    times(6, i => {
      svg.drawCircle(x+90, y+25, i*3, {stroke: i===5? pen.black : pen.red})
    })
  }

  const beautyMark = (x, y) => svg.text('.', x, y)
  const starEyes = (x, y) => {
    svg.drawPath(x, y, star, {size: 0.5})
    svg.drawPath(x+70, y+3, star, {size: 0.43})
  }

  const doubleEyes = (x, y) => {
    svg.drawPath(x, y, eye, {size: 0.92})
    svg.drawPath(x+70, y+2, eye, {size: 0.75})
  }



  const $Eyes = (x, y) => {
    svg.text("$", x, y, {size: 0.42})
    svg.text("$", x+65, y+2, {size: 0.37})
  }


  function drawFace() {
    const drawMouth = prb(0.7)
    const drawEyes = prb(0.7)
    const drawTorso = prb(0.35)

    const drawStache = prb(0.15)
    const drawHair = prb(0.3)
    const drawEyebrows = prb(0.1)
    const drawCheek = prb(0.1)
    const drawBeard = prb(0.125)
    const drawTie = prb(0.1)

    const drawFaceTattoo = prb(0.25)

    if (drawHair) chance(
      [6, () => {
        FEATURES.Hair = 'Highlights'
        hair(720, 186, rndHighlighter())
      }],
      [1, () => {
        FEATURES.Hair = 'Mohawk'
        mohawk(730, 63, rndHighlighter())
      }],
      [1, () => {
        FEATURES.Hair = 'Devil Horns'
        devilHorns(778, 158, rndHighlighter())
      }],
      [1, () => {
        FEATURES.Hair = 'Head Band'
        headband(756, 235)
      }],
      [1, () => {
        FEATURES.Hair = 'Bow'
        hairBow(757, 254)
      }],
      [1, () => {
        FEATURES.Ears = 'Headphones'
        headphones(775, 206)
      }],
      [2.3333, () => {
        FEATURES.Ears = 'Earring'
        earring(782, 357)
      }],
    )()

    if (drawTorso) {
      FEATURES.Blouse = 'Colorful'
      blouse(796, 380, rndHighlighter())
    }

    if (drawEyes) chance(
      [4, () => {
        FEATURES.Eyes = 'Glasses'
        glasses(824, 300, rndHighlighter())
      }],
      [4, () => {
        FEATURES.Eyes = 'Eye Patch'
        eyePatch(827, 280)
      }],
      [4, () => {
        FEATURES.Eyes = `X'd`
        xEyes(866, 301)
      }],
      [4, () => {
        FEATURES.Eyes = '$'
        $Eyes(873, 304)
      }],
      [4, () => {
        FEATURES.Eyes = 'Stars'
        starEyes(857, 294)
      }],
      [4, () => {
        FEATURES.Eyes = 'Glass Eyes'
        doubleEyes(863, 303)
      }],
      [4, () => {
        FEATURES.Eyes = 'Eye Lashes'
        eyeLashes(855, 296)
      }],
      [4, () => {
        FEATURES.Eyes = 'Hearts'
        heartEyes(864, 302)
      }],
      [4, () => {
        FEATURES.Eyes = 'Monocle'
        monocole(848, 295)
      }],
      [1, () => {
        FEATURES.Eyes = 'Laser Eyes'
        laserEyes(872, 301, sample(penColorsAll))
      }],
    )()

    if (drawCheek) chance(
      [1, () => {
        FEATURES.Cheeks = 'Beauty Mark'
        beautyMark(867, 351)
      }],
      [1, () => {
        FEATURES.Cheeks = 'Tear Drops'
        teardrops(856, 324)
      }]
    )()


    if (drawStache) chance(
      [1, () => {
        FEATURES.Stache = 'Walrus'
        walrusStache(880, 368)
      }],
      [1, () => {
        FEATURES.Stache = 'Handle Bars'
        curlyStache(880, 370)
      }],
      [1, () => {
        FEATURES.Stache = 'Thin'
        thinStache(889, 378)
      }],
      [1, () => {
        FEATURES.Nose = 'Nose Ring'
        noseRing(910, 371)
      }],
      [1, () => {
        FEATURES.Nose = 'Clown Nose'
        clownNose(927, 359)
      }],
    )()

    if (drawMouth) chance(
      [1, () => mouthDick(922, 367)],
      [4, () => {
        FEATURES.Mouth = 'Cigarette'
        cigarette(922, 363)
      }],
      [4, () => {
        FEATURES.Mouth = 'Tongue'
        tongue(910, 391)
      }],
      [drawn.walrusStache ? 0 : 4, () => {
        FEATURES.Mouth = 'Smile'
        smile(875, 369)
      }],
      [drawn.walrusStache ? 0 : 4, () => {
        FEATURES.Mouth = 'Frown'
        frown(875, 388)
      }],
      [drawn.walrusStache ? 0 : 4, () => {
        FEATURES.Mouth = 'Open'
        openMouth(890, drawn.thinStache ? 387 : 385)
      }],
      [4, () => {
        FEATURES.Mouth = 'Soul Patch'
        soulPatch(910, 402)
      }],
      [4, () => {
        FEATURES.Mouth = 'Buck Teeth'
        buckTeath(906, 393)
      }],
      [drawn.clownNose || drawStache ? 0 : 2, () => {
        FEATURES.Mouth = 'Ball Gag'
        gag(830, 372)
      }],
      [drawStache ? 0 : 4, () => {
        FEATURES.Mouth = 'Lips'
        lips(887, 380)
      }],
    )()

    if (drawBeard) chance(
      [1, () => {
        FEATURES.Beard = 'Chin'
        chinBeard(832, 365)
      }],
      [1, () => {
        FEATURES.Beard = 'Mutton Chops'
        muttonChops(819, 328)
      }],
      [drawStache||drawn.smile||drawn.frown||drawn.gag ? 0: 1, () => {
        FEATURES.Beard = 'Goatee'
        goatee(880, 375)
      }],
    )()

    if (drawEyebrows) chance(
      [1, () => {
        FEATURES['Eyebrows'] = 'Angry'
        angry(861, 278)
      }],
      [1, () => {
        FEATURES['Eyebrows'] = 'Worried'
        worried(859, 279)
      }],
    )()

    if (drawTie) chance(
      [1, () => {
        FEATURES.Neck = 'Tie'
        tie(868, 458)
      }],
      [1, () => {
        FEATURES.Neck = 'Bow Tie'
        bowtie(840, 450)
      }],
      [1, () => {
        FEATURES.Neck = 'Cross Necklace'
        crossNecklace(794, 400)
      }],
    )()

    if (drawFaceTattoo) {
      const [x, y] = [878, 240]
      chance(
        [1, () => {
          FEATURES['Face Tattoo'] = 'Debugger'
          svg.drawRect(x, y, 62, 33)
          svg.text('0', x+5, y+2)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Bar Code'
          svg.drawRect(x, y+5, 50, 28)
          times(10, t => {
            prb(0.65) && svg.drawLine(x + t*5, y+5, x + t*5, y+33)
          })
        }],
        [2, () => {
          FEATURES['Face Tattoo'] = 'Rosette'
          drawSingleSymbol(x, y, 'rosette')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Heart'
          drawSingleSymbol(x, y, 'heart')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'One'
          drawSingleSymbol(x, y, 'one')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Cross'
          drawSingleSymbol(x, y, 'cross')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'CGK'
          drawSingleSymbol(x, y, 'cgk')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Star'
          drawSingleSymbol(x, y, 'star')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Eye'
          drawSingleSymbol(x, y, 'eye')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Peace'
          drawSingleSymbol(x, y, 'peace')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Shield'
          drawSingleSymbol(x, y, 'shield')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Circle'
          drawSingleSymbol(x, y, 'circle')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'Smiley'
          drawSingleSymbol(x, y, 'smiley')
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = '!!!'
          svg.text('!!!',x+17, y+15, {size: 0.4})
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = '666'
          svg.text('666',x+7, y+15)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'IOU'
          svg.text('IOU',x+7, y+15)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'XXX'
          svg.text('XXX',x+7, y+15)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = '$$$'
          svg.text('$$$',x+7, y+15)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'WINNER'
          svg.text('WINNER',x-25, y+15)
        }],
        [1, () => {
          FEATURES['Face Tattoo'] = 'LOSER'
          svg.text('LOSER',x-15, y+15)
        }],
        [1, () => {
          FEATURES['Dick Count'] += 1
          prb(0.5)
          ? svg.drawPath(x-10, y+5, dick, {size: 0.2})
          : svg.drawPath(x+60, y+35, dick, {size: 0.2, rotation: 180})
        }],
      )()
    }

    if (
      drawn.glasses ||
      drawn.blouse ||
      drawn.hair ||
      drawn.mohawk ||
      drawn.devilHorns
    ) FEATURES['Manual Highlight'] = true
  }





  ////////// SYMBOL

  const star = "M37.5 34L45 12L52 34H75.5L57 48L63.5 70L45 57.5L24.5 70L32.5 48L12 34H37.5Z"
  const dick = "M53.9981 37.4949C129.498 37.4949 247.998 37.4949 247.998 37.4949C334.498 -55.9998 382.998 72.9999 315.998 72.9984C387.998 91.4948 315.998 196 247.998 91.4949C247.998 91.4949 109.996 91.4949 53.9981 91.4949M53.9981 37.4949C62.7241 58.5867 61.8974 70.4054 53.9981 91.4949M53.9981 37.4949C17.1756 37.4949 2.9508 50.3396 4.53649 63.5M53.9981 91.4949C25.3111 91.4949 6.20206 77.3233 4.53649 63.5M4.53649 63.5H26"
  const cgk = `M271.068 236.5H6.93188L139 7.99364L271.068 236.5ZM139 174.5C145.28 174.5 151 169.96 151 163C151 156.373 145.627 151 139 151C132.373 151 127 156.373 127 163C127 169.96 132.72 174.5 139 174.5M141.1121 215.125C104.3582 215.244 67.666 198.2212 49.60112 164.1955C74.6789 124.8432 107.49680000000001 106.00777 139.798 106.12456C172.128 106.24146 205.096 125.3476 230.426 164.279C213.787 197.751 177.874 215.006 141.1121 215.125Z`
  const arrow = 'M180.5 30.5L6.5 30.5M40 3.50003L6.5 30.5 40 57.5'

  const eye = 'M36.2387 11.6627C29.0735 23.2279 10.6866 24.5365 1.76803 11.5803C5.80176 5.02691 12.0891 1.61371 18.4636 1.5028C24.8532 1.39162 31.5138 4.59748 36.2387 11.6627ZM21 11.1297C21 11.9581 20.3284 12.6297 19.5 12.6297C18.6716 12.6297 18 11.9581 18 11.1297C18 10.3012 18.6716 9.62968 19.5 9.62968C20.3284 9.62968 21 10.3012 21 11.1297ZM19.5 15.6297C21.9853 15.6297 24 13.615 24 11.1297C24 8.64439 21.9853 6.62968 19.5 6.62968C17.0147 6.62968 15 8.64439 15 11.1297C15 13.615 17.0147 15.6297 19.5 15.6297Z'
  const peace = 'M15.5 29C22.9558 29 29 22.9558 29 15.5C29 8.04416 22.9558 2 15.5 2C8.04416 2 2 8.04416 2 15.5C2 22.9558 8.04416 29 15.5 29ZM15.5 29V15.5M15.5 3.5V15.5M15.5 15.5L26 23.986M15.5 15.5L5.5 24.5693'
  const shield = 'M46.502 1C42.5483 4.50125 39.2015 5.00392 29.502 1C19.9032 5.23562 15.9266 5.40062 12.002 1L1.5 9C1.99616 18.664 1.78466 31.8493 1.50195 53C8.99119 60.2929 13.9229 62.8076 23.502 65.5C26.3904 66.4944 28.1698 68.0252 30 70.5C32.6994 68.0479 33.6124 66.6461 36.002 65.5C44.9046 62.8249 49.8392 59.9667 58.502 53C57.4616 29.5682 57.2519 18.1938 58.5 9L46.502 1Z'
  const smiley = 'M6.41176 13.7647C9.05882 19.0588 15.5294 19.0588 17.8824 13.7647M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10.2353 9.64706C10.2353 10.2968 9.70857 10.8235 9.05882 10.8235C8.40908 10.8235 7.88235 10.2968 7.88235 9.64706C7.88235 8.99731 8.40908 8.47059 9.05882 8.47059C9.70857 8.47059 10.2353 8.99731 10.2353 9.64706ZM16.1176 9.64706C16.1176 10.2968 15.5909 10.8235 14.9412 10.8235C14.2914 10.8235 13.7647 10.2968 13.7647 9.64706C13.7647 8.99731 14.2914 8.47059 14.9412 8.47059C15.5909 8.47059 16.1176 8.99731 16.1176 9.64706Z'




  const usaTextPath = 'M2 14.5629L9 4.06286M7.5 31.5629H24.5M21 27.0629V4.06286M33 31.5629H66.5M48 2.06286C44.7131 1.48822 44.53 4.86909 44.5 11.5629M44.5 16.5629V25.5629M66.5 2.06286C62.5435 2.4446 62.5084 10.5759 63 27.0629M98.5 3.06445V12.0645M82.5 3.06445V10.5645M82.5 18.0645V26.5645M90.5 12.0645V19.5645M72 31.5645H98.5V22.0645M129.5 3.06445C129.5 12.0645 128 27.5645 133 29.0645M119 28.5645C122.5 33.0645 139.5 35.5645 142.5 27.0629V5.56445M146 31.5645H158.5M152.5 23.5645V10.0645M161 3.06445L168.5 13.0645M173 32.5645C172.798 11.7974 173 4.06445 176.5 4.06445M182 32.5645H195.5M192.5 4.06445V27.0629M200.5 14.5629L204.5 5.56445M217 7.06445V26.5645M204.5 32.5645H220M230.5 32.5645H258V23.5645M242.5 19.5645V27.0629M249.5 12.0645V22.0645M242.5 4.06445V12.0645M258 4.06445V13.0645M264 32.5645H286.5C294.548 28.0942 296.905 23.6207 295 10.0645M279.5 4.06445H276V27.0629M314 33.0652H332C337.309 30.4997 339 27.9046 339 20.5652M320.5 9.56521C316.5 4.06445 324.5 3.06445 329 5.56521M314 19.0652C319.421 22.3047 322.304 23.1911 327 22.5652M342 15.0645L346.5 8.06445M359.5 8.06445V27.5645M347.5 34.0645H361.5M368.5 34.0645H374.5M384 34.0645H397.5M395.5 27.5645L386 5.56521M377 15.0645L374.5 19.0652M373 27.5645V24.0645H379.5M403 34.0645H417M415 27.5645V9.56521M402 6.56445L397.5 14.0645M442.5 4.06445H438V12.0645M445 14.0645V22.5652M438 20.5652V28.5645M426.5 34.0645H454.5V24.0645M454.5 14.0645V5.56521M486.5 5.56521V12.0645M337 4.06445V12.0645M481 9.56521C473.5 1.56445 465.379 4.81157 470 9.56521M461.5 34.0645C461.5 34.0645 475.5 35.0637 481 34.0645C486.5 33.0652 487.903 27.5659 486.5 19.0652M519 5.56521C510.5 -1.93555 511.5 28.5645 515 28.5645M531.5 9.56521C540 28.5645 522 38.5645 509.5 32.5645M564 5.56521V14.0645M548.5 4.06445V12.0645M556 14.0645V24.0645M548.5 20.5652V28.5645M537 34.0645H553M571 34.0645H580.5M589 34.0645H613M591 5.56521L600 28.5645M586 24.0645H578V28.5645M579 19.5645L582 14.0645M609.5 26.5645V14.0645M619 32.5645L626 15.5645M626 34.0645H641M638 28.5645V5.56521M647 34.0645H675.5V25.0645M659 28.5645V19.5645M666.5 23.0645V14.0645M659 14.0645V4.56445H663M674.5 4.56445V14.0645M681.5 34.0645H696M693.5 28.5645V19.5645H696M693.5 14.0645V4.56445C698.055 4.18603 699.263 4.8292 700 7.06445M712.5 7.06445C714.5 10.5645 712.156 15.3915 707.5 17.5645C711.5 22.0645 710.569 24.7386 710.5 28.5645M703.5 33.0645L708.5 34.0645H734M730.5 28.5645V7.56445L733.5 4.56445M755 4.56445C745.5 0.564453 747.5 33.0645 752.5 30.5645M744.5 33.0645C750.839 36.9926 766 33.0645 766 23.0645M764.5 14.0645V5.56521M766 34.0645H775M783.5 34.0645H798.5M795.5 28.5645L785.5 5.56521M772.5 28.5645V25.0645H780M776 15.0645L774 19.0645'
  function usaText(stroke) {
    svg.drawPath(272, 74, usaTextPath, {stroke, size: 1.495})
  }

  const upsideDownCross = (x, y, s=1) => {
    svg.drawLine(x, y, x, y+34*s, {strokeWidth: 5})
    svg.drawLine(x-13*s, y+23*s, x+13*s, y+23*s, {strokeWidth: 5})
  }

  const arrowWest = (x, y, size, stroke) => {
    FEATURES.Arrows += 1
    svg.drawPath(x, y, arrow, { size, stroke })
  }
  const arrowEast = (x, y, size) => {
    FEATURES.Arrows += 1
    svg.drawPath(x, y, arrow, { size, rotation: 180 })
  }
  const arrowNorth = (x, y, size) => {
    FEATURES.Arrows += 1
    svg.drawPath(x, y, arrow, { size, rotation: 90 })
  }
  const arrowSouth = (x, y, size) => {
    FEATURES.Arrows += 1
    svg.drawPath(x, y, arrow, { size, rotation: 270 })
  }

  const bullseye = (x, y, t) => {
    times(t, i => {
      svg.drawCircle(x, y, 1+ i * 10)
    })
  }




  const topTxt = (x, y, fill) => svg.drawRect(x, y, 915, 43, {fill})
  const bottomTxt = (x, y, fill) => svg.drawRect(x, y, 655, 52, {fill})


  const onePath = `M1.5 11.5V15C6.92921 17.6363 8.66226 19.2445 9 22V81L0.5 88V91H47V88L37.5 81V0H15.5C10.5435 6.95806 7.49326 9.41008 1.5 11.5Z`
  const bigOne = (x, y, fill='none') => svg.drawPath(x, y, onePath, { size: 1.5, fill, stroke: 'none' })
  const smallOne = (x, y, fill) => svg.drawPath(x, y, onePath, { size: 0.96, fill, stroke: 'none' })

  const rndSymbolName = () => chance(
    [10,'rosette'],
    [4, 'one'],
    [3, 'eye'],
    [3, 'heart'],
    [3, 'peace'],
    [3, '$'],
    [3, 'circle'],
    [3, 'shield'],
    [3, 'smiley'],
    [2, 'cross'],
    [2, 'square'],
    [2, 'star'],
    [1, 'cgk'],
  )

  const drawSingleSymbol = (x, y, sym, s=1) => {
    if (sym === 'cgk') svg.drawPath(x+s*12, y-s*4, cgk, {size: 0.15*s})
    if (sym === 'star') svg.drawPath(x+s*12, y, star, {size: 0.5*s})
    if (sym === 'heart') svg.drawPath(x-s*43, y+s*5, heartOutline, {size: 1.5*s})
    if (sym === 'one') svg.drawPath(x+s*24, y+s*2, onePath, { size: 0.4*s })
    if (sym === 'cross') upsideDownCross(x+s*32, y+s*4, s)
    if (sym === 'eye') svg.drawPath(x+s*14, y+s*4, eye, {size: s})
    if (sym === 'peace') svg.drawPath(x+s*17, y, peace, {size: s})
    if (sym === 'smiley') svg.drawPath(x+s*17, y, smiley, {size: 1.4*s})
    if (sym === 'shield') svg.drawPath(x+s*17, y, shield, {size: 0.5*s})
    if (sym === '$') svg.text('$',x+22, y+5, {size: s*0.5})
    if (sym === 'circle') svg.drawCircle(x+s*32, y+s*15, 16, {strokeWidth: 5})
    if (sym === 'square') svg.drawRect(x+s*18, y+s*5, s*30, s*30)
    if (sym === 'rosette') {
      const rosettePath = getRosettePath(15, generateGears())
      svg.drawPath(x+s*32, y+s*15, rosettePath, {size: 1.5*s})
    }

    FEATURES['Symbol Count'] += 1
  }


  function drawSymbol(x, y, includeText=true) {
    chance(
      [1, () => {
        svg.drawRect(x, y, 62, 33)
        svg.text('0', x+5, y+2)
      }],
      [2, () => drawSingleSymbol(x, y, 'rosette')],
      [1, () => drawSingleSymbol(x, y, 'heart')],
      [1, () => drawSingleSymbol(x, y, 'one')],
      [1, () => drawSingleSymbol(x, y, 'cross')],
      [1, () => drawSingleSymbol(x, y, 'cgk')],
      [1, () => drawSingleSymbol(x, y, 'star')],
      [1, () => drawSingleSymbol(x, y, 'eye')],
      [1, () => drawSingleSymbol(x, y, 'peace')],
      [1, () => drawSingleSymbol(x, y, 'shield')],
      [1, () => drawSingleSymbol(x, y, 'circle')],
      [1, () => drawSingleSymbol(x, y, 'square')],
      [1, () => svg.text('666',x+7, y+15)],
      [1, () => svg.text('IOU',x+7, y+15)],
      [1, () => svg.text('XXX',x+7, y+15)],
      [1, () => svg.text('$$$',x+7, y+15)],
    )()
  }







  ////////// LAYOUT

  function layout() {
    const leftRosette = prb(0.7)
    const rightRosette = prb(0.7)
    const randomSymbols = prb(0.01)
    const drawGrid = prb(0.025)
    const drawBoner = prb(0.04)
    const doodleHereRight = !rightRosette && prb(0.04)
    const doodleHereLeft = !leftRosette && prb(0.04)
    const isWorthless = !doodleHereRight && !doodleHereLeft && prb(0.025)
    const isHawaii = !isWorthless && !doodleHereRight && !doodleHereLeft && prb(0.005)
    const usaHighlights = prb(0.5)
    const showAura = prb(0.05)

    const centerPattern = chance(
      [95, 0],
      [5, 1],
      [.5, 2],
    )

    const leftBurnHere = !leftRosette && !doodleHereLeft && prb(0.08)
    const rightBurnHere = !rightRosette && !doodleHereRight && prb(0.08)
    const sectionFeatures = {
      leftBurnHere,
      rightBurnHere,
      isStarNote: prb(0.03),
      isBizCard: prb(0.05),
      wheresGeorgeOverride: !leftBurnHere && !leftRosette && prb(0.1),
      showHash: prb(0.1),
      cutHere: prb(0.1),
    }

    const rosetteLines = chance(
      [40, 0], // ribbed
      [20, 1], // checkered or ribbon
      [10, 2], // lines straight or lines dashed
      [10, 3], // spiral
      [10, 4], // fragments
      [10, 5], // double
    )

    const rosetteLinesDashed = prb(0.25)

    const hasLines = [1,2].includes(rosetteLines)


    const variation =
      rosetteLines === 1
        ? 0
        : chance(
          [5, 0], // none
          [1, 1], // exagerated
          [2, 2], // ornate
          [2, 3], // rotating
        )
    const rosetteRadia = variation === 1 ? rnd(0.1, 0.4) : 0.08

    const rosetteRadiaChange = variation === 2 ? chance(
      [1, 0.01],
      [1, 0.005]
    ) : 0

    const rosetteRotation = variation === 3 ? rndint(3, 11) : 0


    const gearStartFn = chance(
      [7, returnOne],
      [2, evenStart],
      [1, wonkyStart],
    )

    const shadow = !rosetteLinesDashed && ![4, 5].includes(rosetteLines) ? prb(0.15) : 0

    const strokeAlt = sample(penColors)
    const lineStroke = prb(0.4) ? penBase : strokeAlt



    FEATURES.Left = leftRosette ? 'Rosette' : 'Symbols'
    FEATURES.Right = rightRosette ? 'Rosette' : 'Symbols'
    FEATURES.George =
      centerPattern === 0 ? 'Accessories'
      : centerPattern === 1 ? 'Rosette'
      : 'Baldessari'

    FEATURES['Rosette Style'] =
      (!leftRosette && !rightRosette) ? 'None'
      : rosetteLines === 0 ? 'Ribbed'
      : rosetteLines === 1 && !rosetteLinesDashed ? 'Checkered'
      : rosetteLines === 1 && rosetteLinesDashed ? 'Ribbon'
      : rosetteLines === 2 && !rosetteLinesDashed ? 'Lines (Straight)'
      : rosetteLines === 2 && rosetteLinesDashed ? 'Lines (Dashed)'
      : rosetteLines === 3 ? 'Spiral'
      : rosetteLines === 4 ? 'Fragmented'
      : 'Double'

    FEATURES['Rosette Pattern'] =
      (!leftRosette && !rightRosette) ? 'None'
      : variation === 1 ? 'Exaggerated'
      : variation === 0 || [2, 3, 4].includes(rosetteLines) ? 'Normal'
      : variation === 2 ? 'Ornate'
      : 'Rotating'

    FEATURES['Rosette Shadow'] = !!shadow
    FEATURES['Wonky Rosettes'] = gearStartFn === wonkyStart
    FEATURES.Burn = sectionFeatures.leftBurnHere || sectionFeatures.rightBurnHere
    FEATURES.Worthless = isWorthless
    FEATURES.Boner = drawBoner
    FEATURES.Grid = drawGrid
    FEATURES.Doodle = doodleHereLeft || doodleHereRight
    FEATURES.Aura = showAura
    FEATURES['Token Hash'] = sectionFeatures.showHash
    FEATURES["Where's George?"] = sectionFeatures.wheresGeorgeOverride
    FEATURES['Biz Card'] = sectionFeatures.isBizCard
    FEATURES['Star Note'] = sectionFeatures.isStarNote
    FEATURES['USA Shadow'] = usaHighlights
    FEATURES['Hawaii Bill'] = isHawaii

    function drawLargeRosette(x, y, {minRad, lineMin, lineMax, layers, dashPadding, fragmentMin, fragmentMax, lineStroke, strokeAlt, }) {
      const gears = generateGears(8, 15, rosetteRadia, gearStartFn)
      if ([0,1,5].includes(rosetteLines)) {
        drawRibbedRosette(x, y, minRad, layers, {gears, rosetteRadiaChange, rosetteRotation: rosetteRotation*(prb(0.5)?1:-1), shadow})
      }

      if (hasLines) {
        if (rosetteLinesDashed) {
          times(layers, i => {
            if (i%2===0) {
              drawLineRosette(x, y, lineMin + i*dashPadding, lineMin + (i+1)*dashPadding-4, gears, {
                shadow,
                stroke: lineStroke
              })
            }
          })
        } else {
          drawLineRosette(x, y, lineMin, lineMax, gears, {shadow, stroke: lineStroke})
        }
      }
      if (rosetteLines === 3) {
        const rosettePath = getRosettePath(
          40,
          gears,
          6,
          0.0002
        )
        svg.drawPath(x, y, rosettePath)
      }

      if (rosetteLines === 4) {
        times(200, t => {

          const rosettePath = getRosettePath(
            rndint(fragmentMin, fragmentMax),
            gears,
            rnd(0.01, 0.1),
            0,
            rnd()
          )
          svg.drawPath(x, y, rosettePath, {
            stroke: prb(0.5) ? penBase : lineStroke,
          })
        })
      }

      if (rosetteLines === 5) {
        drawRibbedRosette(x, y, minRad, layers-2, {
          gears: generateGears(4, 15, rosetteRadia, gearStartFn),
          rosetteRadiaChange,
          rosetteRotation,
          shadow,
          stroke: strokeAlt
        })
      }
    }

    if (doodleHereLeft) {
      svg.drawRect(120, 137, 545, 414)
      svg.text('DOODLE HERE', 280, 144, {size: 0.27})

      drawSections([9], sectionFeatures)

    } else if (leftRosette) {
      drawLargeRosette(413, 350, {
        minRad: 40,
        layers: 10,
        lineMin: 60,
        lineMax: 260,
        dashPadding: 23,
        fragmentMin: 30,
        fragmentMax: 150,
        lineStroke,
        strokeAlt
      })

      if (!variation && !rosetteLines) drawSections([1, 6, 9], sectionFeatures)
    } else {
      drawSections([1, 2, 3, 4, 5, 6, 7, 8, 9], sectionFeatures)
    }


    if (doodleHereRight) {
      svg.drawRect(1080, 235, 540, 350)
      svg.text('DOODLE HERE', 1090, 247, {size: 0.3})

      drawSections([!sectionFeatures.cutHere && 10, 11, 19], sectionFeatures)

    } else if (rightRosette) {
      drawLargeRosette(1305, 404, {
        minRad: 60,
        layers: 8,
        lineMin: 95,
        lineMax: 245,
        dashPadding: 22,
        fragmentMin: 50,
        fragmentMax: 170,
        lineStroke,
        strokeAlt
      })

      if (!variation && !rosetteLines) drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 16, 19], sectionFeatures)

    } else {
      drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], sectionFeatures)
    }


    if (centerPattern === 1) {
      const gears = generateGears(8, 15, rosetteRadia)
      drawRibbedRosette(880, 316, 14, 6, {gears, rosetteRadiaChange: 0, rosetteRotation: 0})

    } else if (centerPattern === 2) {
      const baldessariColor = sample(penColors)
      times(22, t => svg.drawCircle(905, 336, t*4+1, {stroke: baldessariColor}))

    } else {
      const gears = generateGears(8, 15, rosetteRadia)
      drawFace()
    }

    if (showAura) {
      const gears = generateGears(8, 15, rosetteRadia)
      times(3, i => {
        if (i%2===0) {
          drawLineRosette(872, 329, 206 + i*22, 206 + (i+1)*22-4, gears, {
            shadow,
            stroke: lineStroke
          })
        }
      })
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

    if (sectionFeatures.leftBurnHere) {
      if (prb(0.5)) {
        svg.drawRect(506, 265, 153, 185)
        svg.text('BURN', 550, 275)
        bullseye(583, 356, 6)
        svg.text('HERE', 550, 418)
      } else {
        const tb = prb(0.5)
        const mid = !tb || prb(0.5)
        if (prb(0.5)) {
          tb && arrowWest(505, 280, 0.7)
          svg.text('BURN', 550, 322)
          mid && arrowWest(505, 335, 0.7)
          svg.text('HERE', 550, 375)
          tb && arrowWest(505, 390, 0.7)
        } else {
          tb && arrowEast(665, 323, 0.7)
          svg.text('BURN', 550, 322)
          mid && arrowEast(665, 378, 0.7)
          svg.text('HERE', 550, 375)
          tb && arrowEast(665, 433, 0.7)
        }
      }
    }

    if (sectionFeatures.rightBurnHere) {
      svg.text('BURN', 1090, 294)
      svg.text('HERE', 1090, 340)
      prb(0.5)
        ? arrowWest(1090, 380, 0.35)
        : arrowEast(1155, 400, 0.35)

    }


    if (sectionFeatures.cutHere) verticalCut()

    if (sectionFeatures.showHash)
      svg.text(tokenData.hash.toUpperCase(), 480, 57, {size: 0.2})


    if (isWorthless)
      worthless()

    if (isHawaii)
      hawaii()

    if (usaHighlights)
      usaText(sample([pen.red, pen.orange, pen.teal, pen.pink]))



    const topHighlight = prb(0.5)
    const bottomHiglight = prb(0.5)
    const highlightColor1 = rndHighlighter()
    const highlightColor2 = rndHighlighter()

    if (topHighlight) {
      bigOne(81, 98, highlightColor1)
      bigOne(1604, 88, highlightColor1)
    }
    if (bottomHiglight) {
      smallOne(1618, 553, highlightColor1)
      smallOne(77, 548, highlightColor1)
    }

    if (!drawBoner && prb(0.05)) {
      bottomTxt(544, 632, prb(0.5) ? highlightColor1 : highlightColor2)
    }
    if (prb(0.05)) {
      topTxt(413, 7, prb(0.5) ? highlightColor1 : highlightColor2)
    }

    if (!doodleHereLeft && !doodleHereRight && prb(0.333)) {
      svg.drawCircle(412, 351, 50, {stroke: 'none', fill: highlightColor2})
      svg.drawPath(1260, 354, shield, {stroke: 'none', fill: highlightColor2})
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







  const rndText = (x, y) => {
    FEATURES['Has Message'] = true
    chance(
      [1, () => {
        FEATURES.__messages.push("LOSER")
        svg.text("LOSER", x+115, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("WINNER")
        svg.text("WINNER", x+115, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("TIME = MONEY")
        svg.text("TIME = MONEY", x+35, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("MONEY = SLAVERY")
        svg.text("MONEY = SLAVERY", x+5, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("LUCKY DOLLAR")
        svg.text("LUCKY DOLLAR", x+45, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("GOOD LUCK!")
        svg.text("GOOD LUCK!", x+65, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("MONEY MAKES THE WORLD GO ROUND")
        svg.text("MONEY MAKES THE", x+55, y-5)
        svg.text("WORLD GO ROUND", x+60, y+20)
      }],
      [1, () => {
        FEATURES.__messages.push("DON'T BELIEVE THE LIBERAL MEDIA")
        svg.text("DON'T BELIEVE", x+90, y-5)
        svg.text("THE LIBERAL MEDIA", x+55, y+22)
      }],
      [1, () => {
        FEATURES.__messages.push("ANOTHER DAY ANOTHER DOLLAR")
        svg.text("ANOTHER DAY", x+100, y-5)
        svg.text("ANOTHER DOLLAR", x+75, y+22)
      }],
      [1, () => {
        FEATURES.__messages.push("ABOLISH THE FED")
        svg.text("ABOLISH THE FED", x+10, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("ACCEPT JESUS CHRIST AS YOUR LORD AND SAVIOUR")
        svg.text("ACCEPT JESUS CHRIST AS", x+2, y-5)
        svg.text("YOUR LORD AND SAVIOUR", x+7, y+20)
      }],
      [1, () => {
        FEATURES.__messages.push("SEEK FINANCIAL FREEDOM")
        svg.text("SEEK FINANCIAL FREEDOM", x+5, y)
      }],
      [1, () => {
        FEATURES.__messages.push("FOLLOW THE INSTRUCTIONS")
        svg.text("FOLLOW THE INSTRUCTIONS", x+5, y)
      }],
      [1, () => {
        FEATURES.__messages.push("666")
        svg.text("666", x+110, y, {size: 0.65})
      }],
      [1, () => {
        FEATURES.__messages.push("$$$$$$$$$$$$$$")
        svg.text("$$$$$$$$$$$$$$", x+10, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("DO NOT SPEND")
        svg.text("DO NOT SPEND", x+35, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("SPEND WISELY")
        svg.text("SPEND WISELY", x+35, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("SPEND ME")
        svg.text("SPEND ME", x+105, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("SELL ME")
        svg.text("SELL ME", x+105, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("RETURN TO CIRCULATION")
        svg.text("RETURN TO CIRCULATION", x+5, y,)
      }],
      [1, () => {
        FEATURES.__messages.push("DON'T GO TO JAIL")
        svg.text("DON'T GO TO JAIL", x+5, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("BURN AFTER READING")
        svg.text("BURN AFTER READING", x+55, y+10,)
      }],
      [1, () => {
        FEATURES.__messages.push("BUY BITCOIN")
        svg.text("BUY BITCOIN", x+65, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("PUNCH A NAZI")
        svg.text("PUNCH A NAZI", x+10, y, {size: 0.45})
      }],
      [1, () => {
        FEATURES.__messages.push("TAKE THE MONEY AND RUN")
        svg.text("TAKE THE MONEY", x+70, y-5)
        svg.text("AND RUN", x+70, y+20)
      }],
      [1, () => {
        FEATURES.__messages.push("STOP THROWING YOUR MONEY AWAY")
        svg.text("STOP THROWING", x+100, y-5)
        svg.text("YOUR MONEY AWAY", x+70, y+20)
      }],
      [1, () => {
        FEATURES.__messages.push("DO YOUR OWN RESEARCH")
        svg.text("DO YOUR OWN RESEARCH", x+10, y)
      }],
      [1, () => {
        FEATURES.__messages.push("MAKE CASH FAST AT WWW.FASTCASHMONEYPLUS.BIZ")
        svg.text("MAKE CASH FAST AT", x+50, y-10, {size: 0.3})
        svg.text("WWW.FASTCASHMONEYPLUS.BIZ", x-20, y+20, {size: 0.3})
      }],
      [1, () => {
        FEATURES.__messages.push("DON'T THINK ABOUT WHERE THIS DOLLAR HAS BEEN")
        svg.text("DON'T THINK ABOUT WHERE", x-4, y-7, {size: 0.3})
        svg.text("THIS DOLLAR HAS BEEN", x+20, y+20, {size: 0.3})
      }],
      [1, () => {
        FEATURES.__messages.push("CASH RULES EVERYTHING AROUND ME")
        svg.text("CASH RULES", x+100, y-10, {size: 0.3})
        svg.text("EVERYTHING AROUND ME", x+20, y+20, {size: 0.3})
      }],
      [1, () => {
        FEATURES.__messages.push("TEXT 1.848.225.7281 FOR A GOOD TIME")
        svg.text("TEXT 1.848.225.7281", x+50, y-10, {size: 0.3})
        svg.text("FOR A GOOD TIME", x+70, y+20, {size: 0.3})
      }],
    )()
  }

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

  const symbolRow = (x, y, max=7, scale=1) => {
    const sym = prb(0.4) ? rndSymbolName() : false
    const syms = rndint(1,max)
    times(syms, _x =>
      drawSingleSymbol(x + _x*58 + (406-syms*58)/2, y, sym || rndSymbolName(), scale)
    )
  }


  const drawSerial = (x, y, prepend='') => svg.text(
    prepend + times(8, () => rndint(10)).join('') + rndChar(),
    x,
    y,
    {size: 0.6, stroke: pen.green }
  )

  const arrowRow = (x, y, t) => prb(0.5)
    ? times(t, i => arrowEast(x + i*85 + 60, y + 20, 0.3))
    : times(t, i => arrowWest(x + i*85, y, 0.3))


  const leftPadZeros = n => {
    const digits = n.toString().length
    return times(7-digits, d => '0').join('') + n
  }

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
      if (features.wheresGeorgeOverride) {
        prb(0.75) && symbolRow(155, 213, 5)
      }
      else chance(
        [1, () => {
          svg.drawRect(248, 200, 430, 50)
          svg.text('2', 253, 202)
        }],
        [22, () => rndText(253, 213)],
        [2, () => arrowRow(253, 213, 5)],
        [3, () => symbolRow(253, 213)],
        [2, () => hArrows(248, 200)],
        [1, noop],
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

      if (!features.wheresGeorgeOverride && !features.leftBurnHere) chance(
        [1, () => {
          svg.drawRect(506, 265, 153, 185)
          svg.text('4', 511, 267)
        }],
        [12, () => {
          const sym = prb(0.4) ? rndSymbolName() : false
          times(3, x =>
            times(3, y => {
              drawSingleSymbol(495 + x*58, 273+y*60, sym || rndSymbolName())
            })
          )
        }],
        [4, () => times(3, y => symbolRow(380, 273+y*60, 4))],
        [7, () => {
          const sym = rndSymbolName()
          if (sym === '$') svg.text('$', 527, 255, {size: 3})
          else drawSingleSymbol(460 , 278, sym, 4)
        }],
        [1, () => {
          FEATURES['Dick Count'] += 1
          prb(0.5)
            ? svg.drawPath(615 , 500, dick, {size: 0.65, rotation: 240})
            : svg.drawPath(625 , 265, dick, {size: 0.55, rotation: 90})

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
        [3, () => {
          times(2, y => symbolRow(10, 358+y*60, 4))
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
          FEATURES['Dick Count'] += 1
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
          svg.text('8', 255, 512)
        }],
        [2, () => symbolRow(245, 515)],
        [2, () => rndText(250, 522)],
        [1, () => arrowRow(243, 517, 5)],
        [1, () => svg.text('03542754', 254, 461, {size: 0.6, stroke: pen.green })],
        [3, () => drawSerial(255, 512)],
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
          [3, () => {
            svg.text('ID ' + leftPadZeros(tokenData.tokenId), 220, 600, {size: 0.4})
            FEATURES['Token ID'] = true
          }],
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
        [2, () => drawSerial(1117, 143)],
        [1, () => arrowRow(1080, 155, 5)],
        [3, () => symbolRow(1080, 143, 8)],
        [2, () => rndText(1070, 145)],
        [1, () => svg.text('03542754', 1158, 190, {size: 0.6, stroke: pen.green })],
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
        [6, () => drawSingleSymbol(1053, 194, rndSymbolName())],
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
    [14]: (features) => {
      !features.rightBurnHere && chance(
        [4, noop],
        [1, () => {
          svg.drawRect(1078, 241, 100, 240)
          svg.text('14', 1083, 243)
        }],
        [1, () => {
          FEATURES['Dick Count'] += 1
          drawSingleSymbol(1090, 263, rndSymbolName())
          svg.drawPath(1150, 333, dick, {size: 0.4, rotation: 90})
        }],
        [1, () => {
          FEATURES['Dick Count'] += 1
          drawSingleSymbol(1090, 263, rndSymbolName())
          svg.drawPath(1100, 463, dick, {size: 0.4, rotation: 270})
        }],
        [5, () => {
          drawSingleSymbol(1100, 436, rndSymbolName())
          arrowSouth(1108, 426, 0.8)
        }],
        [5, () => {
          drawSingleSymbol(1073, 278, rndSymbolName())
          arrowNorth(1133, 337, 0.8)
        }],
        [5, () => {
          times(4, y => {
            symbolRow(920, 275 + y*60, 3)
          })
        }]
      )()



    },
    [15]: () => {
      chance(
        [5, () => {
          svg.drawRect(1189, 241, 275, 60)
          svg.text('15', 1189+5, 241+2)
        }],
        [10, () => {
          svg.text('MARFA,TX', 1200, 250, {size: 0.5, stroke: pen.red})
          FEATURES['Marfa Branded'] = true
        }],
        [25, () => symbolRow(1100, 240, 7, 0.7)],
        [5, () => arrowRow(1108, 240, 5)],
        [60, noop],
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
        [3, () => symbolRow(1114, 505, 8)],
        [2, () => arrowRow(1110, 505, 6)],
        [1, () => hArrows(1109, 497)],
        [1, noop],
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
    const stroke = sample([pen.black, pen.blue, pen.red])
    const lineStroke = stroke == pen.red
      ? sample([pen.black, pen.blue])
      : sample([pen.red, pen.green])

    svg.text("B", 510, 633, { size: 0.85, strokeWidth: 12/0.85, stroke})
    svg.text("R", 765, 633, { size: 0.85, strokeWidth: 12/0.85, stroke})

    svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12, stroke: lineStroke})
    svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12, stroke: lineStroke})
    svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12, stroke: lineStroke})
  }

  function worthless() {
    const stroke = penBase === pen.black
      ? pen.red
      : sample([pen.black, pen.red, pen.blue])

    const rect = svg.drawRect(150, 250, 1500, 220, { strokeWidth: 12.5, stroke })
    const text = svg.text('WORTHLESS',180, 270, { size: 2.5, strokeWidth: 5, stroke})

    if (prb(0.4)) {
      const rotation = sample([-12, 12])

    } else if (prb(0.6)) {
    }
  }

  function hawaii() {
    const stroke = sample([pen.black, pen.red, pen.blue])
    const text = svg.text('HAWAII',180, 270, { size: 4, strokeWidth: 3, stroke})
  }

  function verticalCut() {
    const xOff = rnd(-300, 300)
    const stroke = pen.black
    cut(872+xOff, 0, 872+xOff, 702, stroke)


    arrowWest(885+xOff, 140, 0.3, stroke)

    if (prb(0.75)) {
      FEATURES.Cut = true
      svg.text('CUT HERE', 950+xOff, 140, {stroke})
    } else {
      FEATURES.Rip = true
      svg.text('RIP HERE', 950+xOff, 140, {stroke})
    }

  }







  ///////// DRAW
  const FEATURES = {
   'Dick Count': 0,
   'Symbol Count': 0,
   'Pen Count': 0,
    Arrows: 0,
    Hair: 'None',
    Ears: 'None',
    Blouse: 'None',
    Eyes: 'None',
    Cheeks: 'None',
    Nose: 'None',
    Stache: 'None',
    Mouth: 'None',
    Beard: 'None',
    Eyebrows: 'None',
    Neck: 'None',
    'Face Tattoo': 'None',
    'Token ID': false,
    Cut: false,
    Rip: false,
    'Manual Highlight': false,
    'Has Message': false,
    'Marfa Branded': false,
    __messages: []
  }

  function draw() {
    const xin = 5.8125
    const yin = 2.34252

    // set up the svg
    svg = new SVG(xin, yin, () => {})

    layout()


    // svg.drawRect(0,0,xin*300, yin*300, {stroke: 'red'})


    svg.mount()

  }

  draw()

  return FEATURES

}

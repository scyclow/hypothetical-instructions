const chars = {
  $: ["M37 17.6281C31.5 4.12389 4 4.12403 4 17.6281C4 31.1322 20 31.6281 20 31.6281C34.8244 35.5162 37 36.6322 37 48.6281C37 60.624 4 63.124 4 48.6281M19.5 0V67", 65, -2],
  A: ["M4 57L10.283 39M45.5 57L39.0472 39M39.0472 39L26.5 4H22.5L10.283 39M39.0472 39H10.283", 65, 0],
  B: ["M27 30H4M27 30L30.0823 28.1032C32.3043 26.7358 34.04 24.7041 35.0435 22.2957V22.2957C35.6749 20.7802 36 19.1548 36 17.513V16.5116C36 13.2868 34.798 10.1778 32.6288 7.79172L32.3289 7.46176C31.4506 6.49561 30.4009 5.70046 29.233 5.11652V5.11652C27.7645 4.38227 26.1452 4 24.5034 4H4V30M27 30L30.7439 32.0159C32.5501 32.9885 34.0718 34.4149 35.159 36.1545V36.1545C35.7172 37.0475 36.1533 38.0111 36.4559 39.0198L36.5411 39.3036C37.1702 41.4006 37.2595 43.6224 36.8008 45.763L36.5276 47.038C36.1806 48.6571 35.4615 50.1731 34.4271 51.4661V51.4661C32.8594 53.4257 30.651 54.7698 28.1902 55.262L25.7623 55.7475C24.9228 55.9154 24.0688 56 23.2127 56H4V30", 55, 0],
  C: ["M49.5 20.5V20.5C42.3883 -4.2948 6.08992 -0.282824 4.5647 25.4666L4 35V35C2.59689 56.3975 28.3482 68.2244 43.665 53.2172L49.5 47.5", 75, 0],
  D: ["M4 55V4H21.9964C23.6503 4 25.2889 4.31558 26.8245 4.9298L29.5 6L31.8965 7.30718C33.9286 8.4156 35.6279 10.0465 36.8188 12.0314L37.3571 12.9285C37.7847 13.6412 38.143 14.3932 38.427 15.1743L40 19.5L41.2443 24.4772C41.4145 25.158 41.5293 25.8513 41.5876 26.5506L41.9135 30.4619C41.9711 31.1529 41.9733 31.8473 41.9201 32.5386L41.5841 36.9073C41.5281 37.6345 41.4111 38.3557 41.2342 39.0632L40.4985 42.006C40.1682 43.3271 39.6324 44.5882 38.9106 45.743L38.2847 46.7445C37.7632 47.5788 37.1488 48.3512 36.4531 49.0469L35.2874 50.2126C34.4333 51.0667 33.4643 51.7976 32.4084 52.3842L31.2739 53.0145C30.0984 53.6675 28.8287 54.1343 27.5101 54.398L25.7623 54.7475C24.9228 54.9154 24.0688 55 23.2127 55H4Z", 65, 0],
  E: ["M35 4H4V29.75M35 55.5H4V29.75M4 29.75H33.5", 60, 0],
  F: ["M35.5 4H4V29.5M4 58.5V31.25V29.5M4 29.5H33", 55, 0],
  G: ["M46 19L44.0877 14.4105C43.6972 13.4734 43.1984 12.5853 42.6013 11.7642L41.7602 10.6078C40.285 8.57931 38.2544 7.02092 35.9134 6.12053L34.3065 5.50249C33.438 5.16846 32.5362 4.92864 31.6165 4.78715L28.4767 4.30411C27.1666 4.10256 25.8334 4.10256 24.5233 4.30411L21.089 4.83247C20.3643 4.94396 19.6503 5.11655 18.9548 5.34841L17.5685 5.81049C15.2373 6.58756 13.1741 8.00943 11.618 9.91128L10.4179 11.3782C9.80785 12.1237 9.28259 12.9348 8.85177 13.7965L6.98116 17.5377C6.66093 18.1781 6.39417 18.8439 6.18359 19.5283L4.92559 23.6168C4.64274 24.5361 4.46277 25.4839 4.38901 26.4429L4.0767 30.5029C4.02564 31.1667 4.02564 31.8333 4.0767 32.4971L4.38901 36.5571C4.46277 37.5161 4.64274 38.4639 4.92559 39.3832L5.98417 42.8235C6.3265 43.9361 6.81673 44.9977 7.44169 45.9798L9.04757 48.5033C9.67959 49.4965 10.4436 50.3992 11.3186 51.1868L13.509 53.1581C14.4972 54.0474 15.6159 54.7799 16.8261 55.3301L18.4472 56.0669C19.8056 56.6844 21.2601 57.0633 22.7471 57.1873L25.4619 57.4135C26.1529 57.4711 26.8473 57.4733 27.5386 57.4201L31.1046 57.1458C32.3615 57.0491 33.5977 56.7701 34.7743 56.3176L36.0102 55.8422C38.2905 54.9652 40.2775 53.4633 41.7434 51.5088L43.065 49.7467C43.6861 48.9185 44.2061 48.0191 44.6139 47.0676L45.9489 43.9526C46.6424 42.3344 47 40.5922 47 38.8316V34H28.5", 70, -2],
  H: ["M4 0V29M4 58V29M4 29H42M42 29V0M42 29V58", 70, 0],
  I: ["M4 0V58", 30, 0],
  J: ["M30.5 0V41.2349C30.5 43.3907 30.0776 45.5257 29.2568 47.5192V47.5192C27.8353 50.9715 24.8784 53.5583 21.2679 54.5084L20.7878 54.6348C18.6326 55.2019 16.3674 55.2019 14.2122 54.6348L13.8698 54.5447C10.1494 53.5656 7.05365 50.989 5.41557 47.5081L4 44.5", 60, 0],
  K: ["M4 3V36M4 58V36M4 36L13.7879 26.5M38 3L13.7879 26.5M13.7879 26.5L38 58", 60, -2],
  L: ["M4 0V52.5H32", 55, 0],
  M: ["M4 57.5V2L29 57.5L52.5 2V57.5", 75, 0],
  N: ["M4 67.5V12L43 67.5V12", 65, -5],
  O: ["M26.3078 4C-1.69245 3.99962 -5.12968 58.0744 26.3078 57.5C57.7453 56.9256 54.308 4.00038 26.3078 4Z", 75, 0],
  P: ["M4 59V4.5766C41.8425 0.476067 38.5802 37.4717 4 34.0778", 50, 0],
  Q: ["M28 42.5L44 65M26.3077 4C-1.6925 3.99962 -5.12972 58.0744 26.3077 57.5C57.7452 56.9256 54.308 4.00038 26.3077 4Z", 75, 0],
  R: ["M4 58.7412V4.31781C33.9265 1.07504 38.1464 23.5335 21.5 31.3927M4 33.819C11.2336 34.529 17.0968 33.4716 21.5 31.3927M21.5 31.3927L36.5 58.7412", 55, 0],
  S: ["M37 14.1281C31.5 0.62389 4 0.624029 4 14.1281C4 27.6322 20 28.1281 20 28.1281C34.8244 32.0162 37 33.1322 37 45.1281C37 57.124 4 59.624 4 45.1281", 60, 0],
  T: ["M0 4H20.75M41.5 4H20.75M20.75 4V59", 65, 0],
  U: ["M4 0C4 0 4 19.5 4 40.5C4 61.5 42.5 60.5 42.5 40.5C42.5 20.5 42.5 0 42.5 0", 70, 2],
  V: ["M4 2L24.5 58L46.5 2", 65, 0],
  W: ["M4 13L19.5 70.5L36 13L53.5 70.5L69 13", 90, -5],
  X: ["M3 2L40 59M40 2L3 59", 60, 0],
  Y: ["M3 2L23 33M23 33L43 2M23 33V59.5", 65, 0],
  Z: ["M3 4H39L7 55H39", 60, 0],
  "0": ["M37 29C37 36.4776 34.9047 43.1162 31.6725 47.8029C28.4316 52.5022 24.2548 55 20 55C15.7452 55 11.5684 52.5022 8.3275 47.8029C5.0953 43.1162 3 36.4776 3 29C3 21.5224 5.0953 14.8838 8.3275 10.1971C11.5684 5.49781 15.7452 3 20 3C24.2548 3 28.4316 5.49781 31.6725 10.1971C34.9047 14.8838 37 21.5224 37 29Z", 60, 2],
  "1": ["M2 15L19 6V58.5", 50, 0],
  "2": ["M4 15.0665C6 1.07016 31.5 -0.428774 31.5 15.0665C31.5 30.5617 4 53.0665 4 60.0713C4 57.0761 30 60.0713 34.5 60.0713", 57, 0],
  "3": ["M5.00195 15.1526C17 -13.3488 57.002 20.6519 14.502 30.1526C54.5 35.1514 27 73.1514 3 47.1514", 52, 0],
  "4": ["M35 65V11L7 50H45", 63, -3],
  "5": ["M35 4H9L6 28.5C52 10.5 40 78 3 47.5", 60, 0],
  "6": ["M35.875 13.6866C26.9313 -4.21425 1.67246 2.80939 4.17322 33.8115M4.17322 33.8115C4.39817 56.6436 28.7265 62.0574 35.875 44.1845C43.0236 26.3115 13.1725 16.8094 4.17322 33.8115Z", 60, 0],
  "7": ["M0 4H33L7 58", 55, 0],
  "8": ["M20.3258 29.5C2.30807 29.5 -0.656445 4 20.3258 4C41.3081 4 34.8081 29.5 20.3258 29.5ZM20.3258 29.5C38.8124 30.999 43.3125 57 20.3258 57C-2.66087 57 -0.188185 29.5 20.3258 29.5Z", 60, 0],
  "9": ["M6.5 47.0607C6.5 60.5605 37.5 63.5605 34 24.6099M34 24.6099C34 -5.43948 4.00715 1.94232 4.00789 17.9411C3.5881 35.1582 20.0068 43.0618 34 24.6099Z", 60, 0],
  "'": ["M9.5 2L4 19", 35, 0],
  "!": ["M7.00975 34V0M9.00586 53.5C9.00586 56.2614 9.00975 56 6.50975 56C3.74832 56 4.0064 56.2534 4.0064 53.4919C4.0064 50.7305 3.74832 50.5 6.50975 50.5C9.27117 50.5 9.00586 50.7386 9.00586 53.5Z", 40, 0],
  ".": ["M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z", 40, 15],
  ' ': ["M0 0", 65, 0],
  ',': ["M9.5 2L4 19", 55, 20],
  '=': ["M0 24H33.5M0 44H33.5", 60, 0],
}

class SVG {
  constructor(xin = 5.8125, yin = 2.34252) {
    const dpi = 300
    this.layers = {}
    this.w = xin * dpi
    this.h = yin * dpi
    this.svg = document.createElementNS(__ns, 'svg')
    this.svg.setAttribute('id', 'svg')
    this.svg.setAttribute('width', '100vw')
    this.svg.setAttribute('viewBox', '0 0 ' + this. w + ' ' + this. h)



    // append the document bounds
    let bounds = document.createElementNS(__ns, 'path');
    bounds.setAttribute('d', `M 0 0 M ${this.w} ${this.h}`);
    this.svg.appendChild(bounds);
  }

  mount() {
    Object.keys(this.layers).forEach(layerKey => {
      console.log(layerKey)
      const g = this.drawG(this.layers[layerKey])
      if (!layerKey.includes('none')) g.setAttribute('id', layerKey)

    })
    document.body.appendChild(this.svg)
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
    const fill = args.fill || 'none'
    const fillOpacity = args.fillOpacity || 0.65
    const size = args.size || 1.5
    const stroke = args.stroke || penBase
    const rotation = args.rotation || 0
    const strokeWidth = args.strokeWidth || 3 * 1.5/size
    const className = args.className || ''
    const path = document.createElementNS(__ns, 'path')

    path.setAttribute('fill', fill)
    path.setAttribute('fill-opacity', fillOpacity)
    path.setAttribute('stroke', stroke)
    path.setAttribute('stroke-linecap', `round`)
    path.setAttribute('stroke-linejoin', `round`)
    path.setAttribute('stroke-width', `${strokeWidth}px`)
    path.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(${size}) rotate(${rotation}deg)`)
    path.setAttribute('class', className)

    path.setAttribute('d', d)
    this.addToLayer(path, stroke, strokeWidth/1.5*size)
    return path
  }



  drawLine(x1, y1, x2, y2, args={}) {
    const strokeWidth = args.strokeWidth || 4
    const stroke = args.stroke || penBase
    const line = document.createElementNS(__ns, 'line')

    line.setAttribute('fill', 'none')
    line.setAttribute('stroke', stroke)
    line.setAttribute('stroke-linecap', `round`)
    line.setAttribute('stroke-width', `${strokeWidth}px`)
    line.setAttribute('x1', x1)
    line.setAttribute('x2', x2)
    line.setAttribute('y1', y1)
    line.setAttribute('y2', y2)
    this.addToLayer(line, stroke, strokeWidth*2/3)
    return line
  }

  drawRect(x, y, w, h, args={}) {
    const f = args.fill || 'none'
    const strokeWidth = args.strokeWidth || 5
    const stroke = args.stroke || penBase

    const fill = document.createElementNS(__ns, 'rect')

    fill.setAttribute('fill', f)
    fill.setAttribute('fill-opacity', 0.65)

    fill.setAttribute('stroke', stroke)
    fill.setAttribute('stroke-linecap', `round`)
    fill.setAttribute('stroke-linejoin', `round`)
    fill.setAttribute('stroke-width', `${strokeWidth}px`)
    fill.setAttribute('x', x)
    fill.setAttribute('y', y)
    fill.setAttribute('width', w)
    fill.setAttribute('height', h)
    this.addToLayer(fill, stroke, strokeWidth*3/5)
    return fill
  }

  drawCircle(x, y, r, args={}) {
    const stroke = args.stroke || penBase
    const fill = args.fill || 'none'
    const strokeWidth = args.strokeWidth || 5

    const c = document.createElementNS(__ns, 'circle')
    c.setAttribute('fill', fill)
    c.setAttribute('stroke', stroke)
    c.setAttribute('stroke-width', `${strokeWidth}px`)

    c.setAttribute('cx', x)
    c.setAttribute('cy', y)
    c.setAttribute('r', r )
    this.addToLayer(c, stroke, strokeWidth*3/5)

  }

  drawG(children) {
    const g = document.createElementNS(__ns, 'g')
    children.forEach(c => g.appendChild(c))
    this.svg.appendChild(g)

    return g
  }

  text(str, x, y, args={}) {
    const size = args.size || 0.3
    const stroke = args.stroke || penBase
    const characters = str.split('')
    const charPaths = []


    const g = document.createElementNS(__ns, 'g')

    let wOffset = 0
    const children = characters.map((c, i) => {
      const [path, w, h] = chars[c]
      const charPath = svg.drawPath(x + wOffset*size, y + h, path, { size, stroke, ...args})
      wOffset += w
      return charPath
    })
    children.forEach(c => g.appendChild(c))
    this.addToLayer(g, stroke, 3)
  }
}
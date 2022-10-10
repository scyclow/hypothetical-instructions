

const topTxt = (x, y, f) => svg.drawRect(x, y, 915, 43, f)
const bottomTxt = (x, y, f) => svg.drawRect(x, y, 655, 52, f)
const usaTxt = (x, y, f) => svg.drawRect(x, y, 1215, 65, f)

// const topTxt = (x, y, f) => drawRect(x, y, 1260, 65, f)

// function usaTxt(x, y, f) {
//   const fill = document.createElementNS(__ns, 'rect')

//   fill.setAttribute('fill', f)
//   fill.setAttribute('fill-opacity', 0.65)


//   fill.setAttribute('x', x)
//   fill.setAttribute('y', y)
//   fill.setAttribute('width', 1260)
//   fill.setAttribute('height', 65)

//   return fill
// }
// function usaTxt(x, y, f) {
//   const fill = document.createElementNS(__ns, 'rect')

//   fill.setAttribute('fill', f)
//   fill.setAttribute('fill-opacity', 0.65)


//   fill.setAttribute('x', x)
//   fill.setAttribute('y', y)
//   fill.setAttribute('width', 1260)
//   fill.setAttribute('height', 65)

//   return fill
// }

// function usaTxt(x, y, f) {
//   const fill = document.createElementNS(__ns, 'rect')

//   fill.setAttribute('fill', f)
//   fill.setAttribute('fill-opacity', 0.65)


//   fill.setAttribute('x', x)
//   fill.setAttribute('y', y)
//   fill.setAttribute('width', 1260)
//   fill.setAttribute('height', 65)

//   return fill
// }


const onePath = `M1.5 11.5V15C6.92921 17.6363 8.66226 19.2445 9 22V81L0.5 88V91H47V88L37.5 81V0H15.5C10.5435 6.95806 7.49326 9.41008 1.5 11.5Z`
const bigOne = (x, y, fill) => svg.drawPath(x, y, onePath, { size: 1.55, fill })
const smallOne = (x, y, fill) => svg.drawPath(x, y, onePath, { size: 1.05, fill })
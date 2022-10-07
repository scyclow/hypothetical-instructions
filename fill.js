function fillBlouse(x, y, f) {
  const fill = document.createElementNS(__ns, 'path')
  fill.setAttribute('stroke', '#000')
  fill.setAttribute('stroke-linecap', `round`)
  fill.setAttribute('stroke-linejoin', `round`)
  fill.setAttribute('stroke-width', `3px`)
  fill.setAttribute('fill', f)
  fill.setAttribute('fill-opacity', 0.65)
  fill.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(1.55)`)

  fill.setAttribute('d', `M26.4975 65.5C1.03585 35.826 -2.27449 22.1124 2.4975 0.5C37.9897 53.9867 59.2908 60.4162 89.9975 42.5V61L102.998 69V88.5L112 98.5L126 147L108.998 160.5C90.4454 152.554 78.5551 149.768 53.4975 149.5L35.5 102L23 83L26.4975 65.5Z`)

  return fill

}

function fillHair(x, y, f) {
  const fill = document.createElementNS(__ns, 'path')
  fill.setAttribute('stroke', '#000')
  fill.setAttribute('stroke-linecap', `round`)
  fill.setAttribute('stroke-linejoin', `round`)
  fill.setAttribute('stroke-width', `3px`)
  fill.setAttribute('fill', f)
  fill.setAttribute('fill-opacity', 0.65)
  fill.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(1.55)`)

  fill.setAttribute('d', `M76.4987 127.002L73.9987 144.502L52.4987 129.002L34.4987 125.002C-6.26369 98.7738 -10.3728 86.7305 21.4987 71.002C16.5703 61.8103 16.6944 56.8903 26.9987 49.002C21.3345 34.4677 29.2392 27.9147 54.9987 18.5C56.4919 8.85742 68.8951 3.05579 107.499 0C140.018 11.4531 155.45 27.3508 173.499 65.502L190.999 101.002C195.667 113.1 186.133 121.538 166.499 134.002C163.75 131.54 170.9 103.681 163.999 85.002C165.44 67.4975 163.99 57.7337 155.499 40.502C138.812 24.2123 131.278 20.8479 122.499 30.0019C94.7677 22.4173 81.8787 20.2506 84.4987 36.502C81.7407 49.5935 82.7571 54.6747 90.9987 58.502C77.1751 65.7495 75.8465 73.9812 73.9987 89.002L76.4987 127.002Z`)

  return fill

}

function fillOne(x, y, f, scale) {
  const fill = document.createElementNS(__ns, 'path')
  fill.setAttribute('stroke', '#000')
  fill.setAttribute('stroke-linecap', `round`)
  fill.setAttribute('stroke-linejoin', `round`)
  fill.setAttribute('stroke-width', `3px`)
  fill.setAttribute('fill', f)
  fill.setAttribute('fill-opacity', 0.65)
  fill.setAttribute('style', `transform: translate(${x}px, ${y}px) scale(${scale})`)

  fill.setAttribute('d', `M1.5 11.5V15C6.92921 17.6363 8.66226 19.2445 9 22V81L0.5 88V91H47V88L37.5 81V0H15.5C10.5435 6.95806 7.49326 9.41008 1.5 11.5Z`)

  return fill
}

function rectFill(x, y, f, w, h) {
  const fill = document.createElementNS(__ns, 'rect')

  fill.setAttribute('fill', f)
  fill.setAttribute('fill-opacity', 0.65)

  fill.setAttribute('stroke', '#000')
  fill.setAttribute('stroke-linecap', `round`)
  fill.setAttribute('stroke-linejoin', `round`)
  fill.setAttribute('stroke-width', `3px`)
  fill.setAttribute('x', x)
  fill.setAttribute('y', y)
  fill.setAttribute('width', w)
  fill.setAttribute('height', h)

  return fill
}
const topTxt = (x, y, f) => rectFill(x, y, f, 965, 43)
const bottomTxt = (x, y, f) => rectFill(x, y, f, 695, 52)
const usaTxt = (x, y, f) => rectFill(x, y, f, 1265, 65)

// const topTxt = (x, y, f) => rectFill(x, y, f, 1260, 65)

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

const bigOne = (x, y, f) => fillOne(x, y, f, 1.55)
const smallOne = (x, y, f) => fillOne(x, y, f, 1.05)
function draw() {


  let bg
  if (!tokenData.plot) {
    const externalAsset = tokenData.externalAssetDependencies[0].cid
    bg = document.createElement('img')
    bg.setAttribute('src', tokenData.preferredIPFSGateway + externalAsset)
    bg.setAttribute('style', 'width: 100vw; position: fixed; z-index: -100;')
    document.body.appendChild(bg)
    document.body.setAttribute('style', 'display: flex; align-items: center; justify-content: center')
  }

  let bgShown = true
  const hideBg = () => {
    if (!bg) return
    if (bgShown) {
      bg.style.visibility = 'hidden'
    } else {
      bg.style.visibility = 'visible'
    }

    bgShown = !bgShown
  }

  // let xin = 6.14
  // let yin = 2.61
  const xin = 5.8125
  const yin = 2.34252

  svg = new SVG(xin, yin, hideBg)


  layout()


  svg.mount()

  console.log('Defacing US currency is a federal crime, and may be punishable with up to six months imprisonment in addition to fines. Neither the Artist nor Plottables LLC condone defacing, mutilating, cutting, disfiguring, perforating, or otherwise damaging US currency.')
}




draw()


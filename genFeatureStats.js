const fs = require('fs')


eval(fs.readFileSync('./features.js', {encoding:'utf8'}))

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}

function genTokenData(projectNum, tokenId=0) {
  let hash = '0x'

  for (let i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16)
  }

  tokenId = String(projectNum * 1000000 + tokenId)

  return {
    hash,
    tokenId,
    externalAssetDependencies: [{
      // cid: 'bafybeiaxqcum3dorimpywtf2rbayujxlkygpyft47yfrd37catiheyojb4',
      cid: 'bafkreibpc3wpdg4mq3bbkesqrxtoho25s3shnfhyotd6rymsag3bcfpeni',
      dependencyType: 'IPFS',
    }],
    preferredIPFSGateway: 'https://ipfs.io/ipfs/',
  }
}

const genStats = (count) => {
  const emptyStats = {__messages: {"LOSER": 0, "WINNER": 0, "TIME = MONEY": 0, "MONEY = SLAVERY": 0, "LUCKY DOLLAR": 0, "GOOD LUCK!": 0, "MONEY MAKES THE WORLD GO ROUND": 0, "DON'T BELIEVE THE LIBERAL MEDIA": 0, "ANOTHER DAY ANOTHER DOLLAR": 0, "ABOLISH THE FED": 0, "ACCEPT JESUS CHRIST AS YOUR LORD AND SAVIOUR": 0, "SEEK FINANCIAL FREEDOM": 0, "FOLLOW THE INSTRUCTIONS": 0, "666": 0, "$$$$$$$$$$$$$$": 0, "DO NOT SPEND": 0, "SPEND WISELY": 0, "SPEND ME": 0, "SELL ME": 0, "RETURN TO CIRCULATION": 0, "DON'T GO TO JAIL": 0, "BURN AFTER READING": 0, "BUY BITCOIN": 0, "PUNCH A NAZI": 0, "TAKE THE MONEY AND RUN": 0, "STOP THROWING YOUR MONEY AWAY": 0, "DO YOUR OWN RESEARCH": 0, "MAKE CASH FAST AT WWW.FASTCASHMONEYPLUS.BIZ": 0, "DON'T THINK ABOUT WHERE THIS DOLLAR HAS BEEN": 0, "CASH RULES EVERYTHING AROUND ME": 0, "TEXT 1.848.225.7281 FOR A GOOD TIME": 0, }, 'Dick Count': { '0': 0, '1': 0, '2': 0 }, 'Symbol Count': {}, 'Pen Count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 }, Arrows: {}, Hair: {None: 0, 'Devil Horns': 0, 'Head Band': 0, Mohawk: 0, Colored: 0, Bow: 0 }, Ears: { None: 0, Headphones: 0, Earring: 0 }, Blouse: { None: 0, Colorful: 0 }, Eyes: {None: 0, 'Glass Eyes': 0, Stars: 0, 'Eye Patch': 0, Glasses: 0, '$': 0, 'Laser Eyes': 0, Hearts: 0, 'Eye Lashes': 0, Monocle: 0, "X'd": 0 }, Cheeks: { None: 0, 'Tear Drops': 0, 'Beauty Mark': 0 }, Nose: { None: 0, 'Nose Ring': 0, 'Clown Nose': 0 }, Stache: { None: 0, Thin: 0, Walrus: 0, 'Handle Bars': 0 }, Mouth: {Frown: 0, Cigarette: 0, None: 0, 'Ball Gag': 0, 'Soul Patch': 0, 'Buck Teeth': 0, Tongue: 0, Smile: 0, Lips: 0, Open: 0 }, Beard: { None: 0, 'Mutton Chops': 0, Chin: 0, Goatee: 0 }, Eyebrows: { None: 0, Angry: 0, Worried: 0 }, Neck: { None: 0, 'Cross Necklace': 0, Tie: 0, 'Bow Tie': 0 }, 'Face Tattoo': {'666': 0, None: 0, Circle: 0, Eye: 0, Heart: 0, Cross: 0, One: 0, Debugger: 0, Smiley: 0, XXX: 0, Peace: 0, CGK: 0, LOSER: 0, Star: 0, Rosette: 0, IOU: 0, 'Bar Code': 0, '!!!': 0, '$$$': 0, Shield: 0, WINNER: 0 }, 'Token ID': { false: 0, true: 0 }, Cut: { false: 0, true: 0 }, Rip: { false: 0, true: 0 }, 'Manual Highlight': { true: 0, false: 0 }, 'Has Message': { true: 0, false: 0 }, 'Marfa Branded': { false: 0, true: 0 }, Left: { Rosette: 0, Symbols: 0 }, Right: { Symbols: 0, Rosette: 0 }, George: { Accessories: 0, Rosette: 0, Baldessari: 0 }, 'Rosette Style': {Ribbon: 0, Ribbed: 0, Fragmented: 0, Checkered: 0, 'Lines (Straight)': 0, 'Lines (Dashed)': 0, Spiral: 0, Double: 0 }, 'Rosette Pattern': { Normal: 0, Exaggerated: 0, Rotating: 0, Ornate: 0 }, 'Rosette Shadow': { false: 0, true: 0 }, 'Wonky Rosettes': { false: 0, true: 0 }, Burn: { false: 0, true: 0 }, Worthless: { false: 0, true: 0 }, Boner: { false: 0, true: 0 }, Grid: { false: 0, true: 0 }, Doodle: { false: 0, true: 0 }, Aura: { false: 0, true: 0 }, 'Token Hash': { false: 0, true: 0 }, "Where's George?": { false: 0, true: 0 }, 'Biz Card': { false: 0, true: 0 }, 'Star Note': { false: 0, true: 0 }, 'USA Shadow': { false: 0, true: 0 }, 'Hawaii Bill': { true: 0, false: 0 } }

  const allFeatures = times(count, t => calculateFeatures(genTokenData(0, t)))


  return allFeatures.reduce((stats, features) => {
    features.__messages.forEach(m => stats.__messages[m] += 1)

    Object.keys(features).forEach(feature => {
      if (feature === '__messages') return

      const value = features[feature]

      if (!stats[feature]) stats[feature] = {}
      if (!stats[feature][value]) stats[feature][value] = 0

      stats[feature][value] += 1
    })

    return stats
  }, emptyStats)
}

// let zeroBurns = 0
// let totalBurn = 0
// times(30, t => {
//   const stats = genStats(200)
//   totalBurn += stats.Burn.true
//   if (stats.Burn.true === 0) zeroBurns++
// })

function avgGenStats (trials, count) {

  return times(trials, t => genStats(count)).reduce((stats, trial) => {
    Object.keys(trial).forEach(feature => {
      if (!stats[feature]) stats[feature] = {}


      const values = trial[feature]
      Object.keys(values).forEach(value => {
        if (!stats[feature][value]) stats[feature][value] = {min: trial[feature][value], max: 0, avg: 0}

        if (trial[feature][value] < stats[feature][value].min) stats[feature][value].min = trial[feature][value]
        if (trial[feature][value] > stats[feature][value].max) stats[feature][value].max = trial[feature][value]

        stats[feature][value].avg = Number((stats[feature][value].avg + trial[feature][value]/trials).toFixed(2))
      })
    })

    return stats
  }, {})

}

console.log(avgGenStats(20, 500))


// console.log(genStats(400))

// console.log(featureSummary)






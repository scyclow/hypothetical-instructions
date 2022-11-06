const fs = require('fs')


const utils = fs.readFileSync('./utils.js', 'utf8')
const colors = fs.readFileSync('./colors.js', 'utf8')
const rosette = fs.readFileSync('./rosette.js', 'utf8')
const george = fs.readFileSync('./george.js', 'utf8')
const symbol = fs.readFileSync('./symbol.js', 'utf8')
const layout = fs.readFileSync('./layout.js', 'utf8')
const svg = fs.readFileSync('./svg.js', 'utf8')
const draw = fs.readFileSync('./draw.js', 'utf8')


const script = [utils, colors, rosette, george, symbol, layout, svg, draw].join(';')




fs.writeFileSync('./premin.js', script)

// split -b 15k min.js minified/min
const materialColors = require('../colors.js');
const _ = require('lodash');
const color = require('tinycolor2');
const Bar = require('../bar.js');


let cache = new Map();

module.exports = function(ctx, random, width, height, ...paletteNames) {
  let palettes = generatePalettes();

  const bar = Bar(width*height, 'palette');
  let palette = paletteNames.reduce((acc, paletteName) => acc.concat(palettes[paletteName]), new Array());
  _.compact(palette);
  if (palette.length == 0) { console.error(`Empty palette for paletteNames ${paletteNames.join(', ')}`); return; }
  console.log(`Palette: ${palette.join(', ')}`);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pixel = ctx.getImageData(x, y, 1, 1).data;
      ctx.fillStyle = nearestInPalette(pixel[0], pixel[1], pixel[2], palette);
      ctx.fillRect(x, y, 1, 1);
      bar.tick();
    }
  }
}

function generatePalettes() {
  let palettes = new Object();

  Object.keys(materialColors).forEach(key => {
    palettes[`${key}s`] = Object.values(materialColors[key]);
  });

  palettes.material = _.flatten(Object.values(palettes));
  palettes.at500 = Object.values(materialColors).reduce((acc, color) => acc.concat([color['500']]), new Array());
  palettes.primaries = Object.values(materialColors).reduce((acc, color) => acc.concat([color['700']]), new Array());
  palettes.at700 = palettes.primaries;
  palettes.black = ['#000000'];
  palettes.white = ['#FFFFFF'];

  return _.mapValues(palettes, _.compact);
}

function nearestInPalette(r, g, b, palette) {
  if (cache.has(r*g*b)) return cache.get(r*g*b);
  let rgb = color({r, g, b});
  let minDist = Infinity;
  let match = palette[0];
  
  for (let i = 0; i < palette.length; i++) {
    let palRgb = color(palette[i]);
    
    let dR = palRgb._r - rgb._r;
    let dG = palRgb._g - rgb._g;
    let dB = palRgb._b - rgb._b;
    let dist = dR*dR + dG*dG + dB*dB;
    
    if (dist < minDist) {
      minDist = dist;
      match = palette[i];
      cache.set(r*g*b, match);
    }
  }
  return match;
};
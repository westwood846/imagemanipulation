const Bar = require('../bar.js');
const color = require('tinycolor2');
const _ = require('lodash');


module.exports = function(ctx, random, width, height, columns, rows) {
  const bar = Bar(columns*rows, 'pixelize');

  let w = Math.round(width/columns);
  let h = Math.round(height/rows);

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let wi = Math.min(w, width - x*w);
      let hi = Math.min(h, height - y*h);
      let pixels = ctx.getImageData(x*w, y*h, wi, hi).data;
      let c = averagePixels(pixels);
      ctx.fillStyle = c.toHexString();
      ctx.fillRect(x*w, y*h, wi, hi);
      bar.tick();
    }
  }
}

function averagePixels(pixels) {
  let r = pixels.filter((v, i) => i % 4 == 0).reduce((acc, v, i, array) => acc + v/array.length);
  let g = pixels.filter((v, i) => i % 4 == 1).reduce((acc, v, i, array) => acc + v/array.length);
  let b = pixels.filter((v, i) => i % 4 == 2).reduce((acc, v, i, array) => acc + v/array.length);
  // _.chunk(pixels, 4).map(chunk => _.take(chunk, 3)).forEach(pixel => {

  // });
  return color({r, g, b});
}
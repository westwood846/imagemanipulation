const Bar = require('../bar.js');
const color = require('tinycolor2');
const _ = require('lodash');
const sorts = require('../lib/sorts');


module.exports = function(ctx, random, width, height, columns, rows, sort='mult') {
  const bar = Bar(columns*rows, 'tilesort');

  let w = Math.round(width/columns);
  let h = Math.round(height/rows);

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let wi = Math.min(w, width - x*w);
      let hi = Math.min(h, height - y*h);
      processTile(ctx, sort, x*w, y*h, wi, hi);
      bar.tick();
    }
  }
  
}

function processTile(ctx, sort, x, y, w, h) {
  let tile = ctx.getImageData(x, y, w, h).data;
  let pixels = (_.chunk(tile, 4).map(pixel => _.take(pixel, 3)));
  pixels = _.sortBy(pixels, sorts[sort]).reverse();
  pixels.forEach((pixel, i) => {
    let c = color({r: pixel[0], g: pixel[1], b: pixel[2]});
    ctx.fillStyle = c.toHexString();
    ctx.fillRect(x + i % w, y + Math.floor(i/w), 1, 1);
  });
}

const _ = require('lodash');
const color = require('tinycolor2');
const Bar = require('../bar.js');
const sorts = require('../lib/sorts');


module.exports = function(ctx, random, width, height, sort='mult') {
  const bar = Bar(width, 'pixelsort');

  for (let x = 0; x < width; x++) {
    let pixels = ctx.getImageData(x, 0, 1, height).data;
    let chunk = (_.chunk(pixels, 4).map(chunk => _.take(chunk, 3)));
    chunk = _.sortBy(chunk, sorts[sort]).reverse();
    chunk.forEach((pixel, y) => {
      let c = color({r: pixel[0], g: pixel[1], b: pixel[2]});
      ctx.fillStyle = c.toHexString();
      ctx.fillRect(x, y, 1, 1);
    });
    bar.tick();
  }
}

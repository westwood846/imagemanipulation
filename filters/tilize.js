const Bar = require('../bar.js');
const color = require('tinycolor2');


module.exports = function(ctx, random, width, height, columns, rows) {
  const bar = Bar(width*height, 'tilize');

  let w = Math.round(width/columns);
  let h = Math.round(height/rows);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pixel = ctx.getImageData(Math.floor(x/w)*w + w/2, Math.floor(y/h)*h + w/2, 1, 1).data;
      let c = color({r: pixel[0], g: pixel[1], b: pixel[2]});
      ctx.fillStyle = c.toHexString();
      ctx.fillRect(x, y, 1, 1);
      bar.tick();
    }
  }
}

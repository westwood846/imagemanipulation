const colors = require('../colors.js');
const _ = require('lodash');

module.exports = function(ctx, random, width, height) {
  const primaries = Object.values(colors).map(c => c['700']).filter(c=>c);
  let backgroundColor = '#ffffff';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  let cols = Object.values(colors);
  let grads = Object.keys(colors.amber);
  grads = _.pull(grads, 'a100', 'a200', 'a400', 'a700');

  let borderWidth = 16;
  let borderColor = colors.grey['50'];
  
  let colWidth = (width)/(cols.length);
  let colHeight = (height)/(grads.length);
  
  for (let c = 0; c < cols.length; c++) {
    for (let g = 0; g < grads.length; g++) {
      let color = cols[c][grads[g]];
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(
        colWidth  * c,
        colHeight * g,
        colWidth,
        colHeight
      );
      ctx.fillStyle = color;
      ctx.fillRect(
        colWidth  * c + borderWidth,
        colHeight * g + borderWidth,
        colWidth  - borderWidth * 2,
        colHeight - borderWidth * 2
      );
    }
  }
}
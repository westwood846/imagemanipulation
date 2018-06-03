const _ = require('lodash');

module.exports = pixels => {
  pixels = _.flatten(pixels);
  let r = _.mean(pixels.filter((v, i) => i % 4 === 0));
  let g = _.mean(pixels.filter((v, i) => i % 4 === 1));
  let b = _.mean(pixels.filter((v, i) => i % 4 === 2));
  return {r, g, b};
}
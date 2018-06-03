const fs  = require('fs');
const {Image} = require('canvas');


module.exports = function(ctx, random, width, height, path) {
  console.log(`Loading ${path}`)
  let img = new Image;
  img.src = fs.readFileSync(path);;
  ctx.drawImage(img, 0, 0, width, height);
}

const colors = require('material-colors');

module.exports = function(ctx, random, width, height) {
  const primaries = Object.values(colors).map(c => c['700']).filter(c=>c);
  const reds = Object.values(colors.red);
  const greens = Object.values(colors.green);

  // let backgroundColor = '#101010';
  let backgroundColor = colors.green['200'];
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = random.pick(reds.concat(greens));
    ctx.beginPath();
    ctx.arc(
      random.integer(0, width),
      random.integer(0, height),
      random.integer(300, 800),
      0,
      Math.PI*2,
      true
    );
    ctx.closePath();
    ctx.fill();
  }
}
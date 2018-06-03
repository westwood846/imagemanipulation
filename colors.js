const materialColors = require('material-colors');

module.exports = prepare();

function prepare() {
  let colors = Object.assign({}, materialColors);
  delete colors.darkIcons;
  delete colors.darkText;
  delete colors.lightIcons;
  delete colors.lightText;
  delete colors.black;
  delete colors.white;
  return colors;
}
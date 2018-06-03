const ProgressBar = require('progress');

module.exports = function(total, title) {
  return new ProgressBar(`${title} [:bar] :etas (:percent) :elapseds`, { total });
}
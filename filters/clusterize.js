// const Bar        = require('../bar.js');
const _             = require('lodash');
const clustering    = require('density-clustering');
const color         = require('tinycolor2');
const averagePixels = require('../lib/average-pixels');

let palette = [[244,67,54,255], [33,150,243,255], [76,175,80,255]];


module.exports = function(ctx, random, width, height, radius, minSize) {
  console.log('Preparing image data');
  let imageData = ctx.getImageData(0, 0, width, height);
  let pixels = _.chunk(imageData.data, 4);
  
  console.log(`Clustering ${width}*${height}=${width*height} pixels`);
  let dbscan = new clustering.DBSCAN();
  let clusters = dbscan.run(pixels, radius, minSize);
  
  console.log(`Found ${clusters.length} clusters and ${dbscan.noise.length} noise pixels`)

  dbscan.noise.forEach(pixelIndex => {
    pixels[pixelIndex] = [255,255,255,0];
  });

  clusters.forEach((cluster, clusterIndex) => {
    let pixelsInCluster = _.at(pixels, cluster);
    let average = averagePixels(pixelsInCluster);
    average = [average.r, average.g, average.b, 255];
    cluster.forEach(pixelIndex => {
      // pixels[pixelIndex] = palette[clusterIndex % palette.length];
      pixels[pixelIndex] = average;
    })
  })

  imageData.data.set(_.flatten(pixels));
  ctx.putImageData(imageData, 0, 0, 0, 0, width, height);
}

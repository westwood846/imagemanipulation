const Canvas = require('canvas');
const Random = require("random-js");
const fs = require('fs');
const _ = require('lodash');
const sanitize = require("sanitize-filename");

let width = parseInt(process.argv[2]);
let height = parseInt(process.argv[3]);
let args = process.argv.slice(4);
let filterChunks = chunkByValue(args, '-');
console.dir({width, height})
console.dir(filterChunks)

let canvas = new Canvas(width, height);
let ctx = canvas.getContext('2d');
ctx.antialias = 'default';

const seed = 0;
let random = new Random(Random.engines.mt19937().seed(seed));

let ping = Date.now();

filterChunks.forEach(filterChunk => {
  let [filterName, ...filterArgs] = filterChunk;
  let filter = require(`./filters/${filterName}.js`);
  filter(ctx, random, width, height, ...filterArgs);
});

let pong = Date.now();
console.log(`Drawn in ${Math.round((pong - ping)/1000/60*1000)/1000}m`);

let outPath = `${__dirname}/out`;
let outName = sanitize(filterChunks.map(chunk => chunk.join('-')).concat(Date.now()).join('_'));
let namePath = `${__dirname}/out/${outName}`;
renderToFile(outPath, 'jpg');
renderToFile(outPath, 'png');
renderToFile(namePath, 'png');


function renderToFile(path, format='png') {
  path = `${path}.${format}`;
  let out = fs.createWriteStream(path);
  let stream;
  if (format == 'png') {
    stream = canvas.pngStream();
  } else if (format == 'jpg') {
    stream = canvas.jpegStream() 
  } else {
    console.error(`Unknown format: ${format}`);
    return;
  }

  stream.on('data', function(chunk){
    out.write(chunk);
  });

  stream.on('end', function(){
    console.log(`Saved to ${path}`);
  });
}

function chunkByValue(array, value) {
  let result = new Array();
  let chunk = new Array();
  array.forEach((element, index) => {
    if (element == value) {
      result.push(chunk);
      chunk = new Array();
    } else {
      chunk.push(element);
    }
  });
  result.push(chunk);
  return result;
}
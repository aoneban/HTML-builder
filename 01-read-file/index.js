const path = require('path');
let fs = require('fs'),
  reader = fs.createReadStream(path.join(__dirname, 'text.txt'));

reader.on('data', function (chunk) {
  console.log(chunk.toString());
});

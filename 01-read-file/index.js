const path = require('path');
let fs = require('fs'),
  
// Use fs.createReadStream() method
// to read the file
reader = fs.createReadStream(path.join(__dirname, 'text.txt'));
  
// Read and display the file data on console
reader.on('data', function (chunk) {
    console.log(chunk.toString());
});
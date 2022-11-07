const fs = require('fs');
const path = require('path');
  
// Function to get current filenames
// in directory
fs.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent files in secret-folder:");
    files.forEach(file => {
      console.log('file: ', file);
    })
  }
})
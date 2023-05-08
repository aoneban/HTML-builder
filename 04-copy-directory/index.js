
const fs = require('fs');
const path = require('path');

const sourceDir_2 = path.join(__dirname, 'files');
const destinationDir_2 = path.join(__dirname, 'files-copy');

fs.mkdir(destinationDir_2, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }

  fs.readdir(sourceDir_2, (err, files) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir_2, file);
      const destinationPath = path.join(destinationDir_2, file);

      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(`Error: ${err}`);
        } else {
          console.log(`Copied file: ${sourcePath}`);
        }
      });
    });
  });
});

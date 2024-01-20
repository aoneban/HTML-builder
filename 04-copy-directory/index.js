const fs = require('fs');
const path = require('path');

function checkAndRemoveDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
      } else {
        fs.rmdir(directoryPath, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}

const folder = path.join(__dirname, '04-copy-directory', 'files-copy');

checkAndRemoveDirectory(folder)
  .then((removed) => {
    if (removed) {
      console.log(`Directory ${folder} deleted.`);
    } else {
      const sourceDir = path.join(__dirname, 'files');
      const resultDir = path.join(__dirname, 'files-copy');

fs.mkdir(resultDir, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(resultDir, file);

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
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });



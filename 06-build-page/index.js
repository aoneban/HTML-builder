const fs = require('fs');
const path = require('path');

const destinationDir = path.join(__dirname, 'project-dist');
const sourceDirTwo = path.join(__dirname, 'assets');
const destinationDirTwo = path.join(__dirname, 'project-dist', 'assets');
const filePath = path.join(__dirname, 'template.html');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(data);
  const filePath = path.join(__dirname, 'project-dist', 'index.html');
  const fileContent = data;
  fs.writeFile(filePath, fileContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log(`File ${filePath} created successfully.`);
  });
  const componentsDir = path.join(__dirname, 'components');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    function readComponentFile(componentFile, placeholder) {
      return new Promise((resolve, reject) => {
        const componentFilePath = path.join(componentsDir, componentFile);
        fs.readFile(componentFilePath, 'utf8', (err, componentData) => {
          if (err) {
            reject(`Error: ${err}`);
            return;
          }
          data = data.replace(placeholder, componentData);
          resolve();
        });
      });
    }

    Promise.all([
      readComponentFile('header.html', '{{header}}'),
      readComponentFile('articles.html', '{{articles}}'),
      readComponentFile('footer.html', '{{footer}}'),
    ])
      .then(() => {
        fs.writeFile(filePath, data, 'utf8', (err) => {
          if (err) {
            console.error(`Error: ${err}`);
            return;
          }

          console.log(`File ${filePath} created successfully.`);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

function copyDirectoryRec(source, destination, callback) {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) {
      callback(err);
      return;
    }

    fs.readdir(source, (err, files) => {
      if (err) {
        callback(err);
        return;
      }

      files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);

        fs.stat(sourcePath, (err, stats) => {
          if (err) {
            callback(err);
            return;
          }

          if (stats.isFile()) {
            fs.copyFile(sourcePath, destinationPath, (err) => {
              if (err) {
                callback(err);
              } else {
                console.log(`Copied file: ${sourcePath}`);
              }
            });
          } else if (stats.isDirectory()) {
            copyDirectoryRec(sourcePath, destinationPath, callback);
          }
        });
      });

      callback(null);
    });
  });
}

copyDirectoryRec(sourceDirTwo, destinationDirTwo, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log('Success');
  }
});

fs.mkdir(destinationDir, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  fs.readFile(
    path.join(__dirname, 'styles', 'header.css'),
    'utf8',
    (err, data1) => {
      if (err) {
        console.error(`Error: ${err}`);
        return;
      }

      fs.readFile(
        path.join(__dirname, 'styles', 'main.css'),
        'utf8',
        (err, data2) => {
          if (err) {
            console.error(`Error: ${err}`);
            return;
          }

          fs.readFile(
            path.join(__dirname, 'styles', 'footer.css'),
            'utf8',
            (err, data3) => {
              if (err) {
                console.error(`Error: ${err}`);
                return;
              }

              const combinedData = data1 + data2 + data3;

              fs.writeFile(
                path.join(__dirname, 'project-dist', 'style.css'),
                combinedData,
                'utf8',
                (err) => {
                  if (err) {
                    console.error(`Error: ${err}`);
                  } else {
                    console.log(`Success`);
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

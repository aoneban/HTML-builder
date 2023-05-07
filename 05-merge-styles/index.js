const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, 'styles','style-1.css'), 'utf8', (err, data1) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
  
    fs.readFile(path.join(__dirname, 'styles','style-2.css'), 'utf8', (err, data2) => {
      if (err) {
        console.error(`Error: ${err}`);
        return;
      }

      fs.readFile(path.join(__dirname, 'styles','style-3.css'), 'utf8', (err, data3) => {
        if (err) {
          console.error(`Error: ${err}`);
          return;
        }
  
        const combinedData = data1 + data2 + data3;

        fs.writeFile(path.join(__dirname, 'project-dist','bundle.css'), combinedData, 'utf8', (err) => {
          if (err) {
            console.error(`Error: ${err}`);
          } else {
            console.log(`Success`);
          }
        });
      });
    });
  });
  
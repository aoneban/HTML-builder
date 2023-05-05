
const fs = require('fs');
const path = require('path');
//const { copyFile, constants } = require('promises');

fs.mkdir(path.join(__dirname, 'files-copy'), err => {
    if (err) throw err;
    console.log('Папка была создана');
});

//import { copyFile, constants } from 'node:fs/promises';

try {
  await fs.copyFile('files', 'files-copy');
  console.log('files was copied to files-copy');
} catch {
  console.log('The file could not be copied');
}

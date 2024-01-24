const fs = require('fs').promises;
const path = require('path');

async function readDirectory() {
  try {
    const directoryPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(directoryPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(directoryPath, file.name);
        const stats = await fs.stat(filePath);

        console.log(
          '``` ' +
            file.name.replace(/\..+$/, '') +
            ' - ' +
            path.extname(file.name).replace('.', '') +
            ' - ' +
            stats.size +
            'кб' +
            ' ```',
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readDirectory();

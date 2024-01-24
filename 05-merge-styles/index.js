const fs = require('fs').promises;
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distDir, 'bundle.css');

async function readAndCombineStyles() {
  try {
    const files = await fs.readdir(stylesDir);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    const readPromises = cssFiles.map(async (file) => {
      const filePath = path.join(stylesDir, file);
      return fs.readFile(filePath, 'utf8');
    });
    const stylesData = await Promise.all(readPromises);
    const combinedData = stylesData.join('\n');
    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(bundlePath, combinedData, 'utf8');
    console.log('Success');
  } catch (error) {
    console.error('Error:', error);
  }
}

readAndCombineStyles();

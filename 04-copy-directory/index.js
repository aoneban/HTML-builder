const fsPromises = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const resultDir = path.join(__dirname, 'files-copy');

async function checkAndCreateDirectory(directoryPath) {
  try {
    await fsPromises.access(directoryPath, fsPromises.constants.F_OK);
  } catch (error) {
    await fsPromises.mkdir(directoryPath, { recursive: true });
  }
}

async function removeFiles() {
  try {
    const filesCopy = await fsPromises.readdir(resultDir);
    const removePromises = filesCopy.map(async (file) => {
      const filePath = path.join(resultDir, file);
      await fsPromises.unlink(filePath);
    });
    await Promise.all(removePromises);
    console.log('Success');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function copyFiles() {
  try {
    const files = await fsPromises.readdir(sourceDir);
    const copyPromises = files.map(async (file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(resultDir, file);
      const fileData = await fsPromises.readFile(sourcePath);
      await fsPromises.writeFile(destinationPath, fileData);
      console.log(`Copied: ${sourcePath}`);
    });
    await Promise.all(copyPromises);
    console.log('Success');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  try {
    await checkAndCreateDirectory(resultDir);
    await removeFiles();
    await copyFiles();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

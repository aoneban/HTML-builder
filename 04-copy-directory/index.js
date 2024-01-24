const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const resultDir = path.join(__dirname, 'files-copy');

async function checkAndCreateDirectory(directoryPath) {
  try {
    await fs.access(directoryPath, fs.constants.F_OK);
  } catch (error) {
    await fs.mkdir(directoryPath, { recursive: true });
  }
}

async function removeFiles() {
  try {
    const filesCopy = await fs.readdir(resultDir);
    const removePromises = filesCopy.map(async (file) => {
      const filePath = path.join(resultDir, file);
      await fs.unlink(filePath);
    });
    await Promise.all(removePromises);
    console.log('Success');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function copyFiles() {
  try {
    const files = await fs.readdir(sourceDir);
    const copyPromises = files.map(async (file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(resultDir, file);
      await fs.copyFile(sourcePath, destinationPath);
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

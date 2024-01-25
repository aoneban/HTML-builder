const fsPromises = require('fs').promises;
const path = require('path');

const goalDir = path.join(__dirname, 'project-dist');
const startingDirTwo = path.join(__dirname, 'assets');
const goalDirTwo = path.join(__dirname, 'project-dist', 'assets');
const filePath = path.join(__dirname, 'template.html');

async function readComponentFiles(componentsDir) {
  try {
    const files = await fsPromises.readdir(componentsDir);

    const componentProm = files.map(async (file) => {
      const placeholder = `{{${file.replace('.html', '')}}}`;
      const componentPath = path.join(componentsDir, file);
      const componentData = await fsPromises.readFile(componentPath, 'utf8');
      return { placeholder, componentData };
    });

    return Promise.all(componentProm);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function loadComponents() {
  try {
    const componentsDir = path.join(__dirname, 'components');
    const components = await readComponentFiles(componentsDir);
    let data = await fsPromises.readFile(filePath, 'utf8');
    components.forEach(({ placeholder, componentData }) => {
      data = data.replace(placeholder, componentData);
    });
    const indexPath = path.join(goalDir, 'index.html');
    await fsPromises.writeFile(indexPath, data, 'utf8');
    console.log(`File ${indexPath} created with success.`);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function copyDirectoryRec(starting, goal) {
  try {
    await fsPromises.mkdir(goal, { recursive: true });
    const files = await fsPromises.readdir(starting);
    await Promise.all(
      files.map(async (file) => {
        const startingPath = path.join(starting, file);
        const goalPath = path.join(goal, file);
        const stats = await fsPromises.stat(startingPath);
        if (stats.isFile()) {
          const fileData = await fsPromises.readFile(startingPath);
          await fsPromises.writeFile(goalPath, fileData);
          console.log(`Copy: ${startingPath}`);
        } else if (stats.isDirectory()) {
          await copyDirectoryRec(startingPath, goalPath);
        }
      }),
    );
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function createStyleFile() {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const styleFiles = await fsPromises.readdir(stylesDir);
    const stylePromises = styleFiles.map(async (file) => {
      const stylePath = path.join(stylesDir, file);
      return await fsPromises.readFile(stylePath, 'utf8');
    });

    const combinedStyleData = (await Promise.all(stylePromises)).join('\n');
    await fsPromises.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      combinedStyleData,
      'utf8',
    );
    console.log('success');
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function main() {
  try {
    await copyDirectoryRec(startingDirTwo, goalDirTwo);
    console.log('Success');
    await loadComponents();
    await createStyleFile();
    await fsPromises.mkdir(goalDir, { recursive: true });
    console.log('success');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

main();

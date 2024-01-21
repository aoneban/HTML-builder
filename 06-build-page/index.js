const fs = require('fs').promises;
const path = require('path');

const goalDir = path.join(__dirname, 'project-dist');
const startingDirTwo = path.join(__dirname, 'assets');
const goalDirTwo = path.join(__dirname, 'project-dist', 'assets');
const filePath = path.join(__dirname, 'template.html');

async function readComponentFiles(componentsDir) {
  try {
    const files = await fs.readdir(componentsDir);

    const componentProm = files.map(async (file) => {
      const placeholder = `{{${file.replace('.html', '')}}}`;
      const componentPath = path.join(componentsDir, file);
      const componentData = await fs.readFile(componentPath, 'utf8');
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
    let data = await fs.readFile(filePath, 'utf8');
    components.forEach(({ placeholder, componentData }) => {
      data = data.replace(placeholder, componentData);
    });
    const indexPath = path.join(goalDir, 'index.html');
    await fs.writeFile(indexPath, data, 'utf8');
    console.log(`File ${indexPath} created width success.`);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function copyDirectoryRec(starting, goal) {
  try {
    await fs.mkdir(goal, { recursive: true });
    const files = await fs.readdir(starting);
    await Promise.all(
      files.map(async (file) => {
        const startingPath = path.join(starting, file);
        const goalPath = path.join(goal, file);
        const stats = await fs.stat(startingPath);
        if (stats.isFile()) {
          await fs.copyFile(startingPath, goalPath);
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
    const styleFiles = await fs.readdir(stylesDir);
    const stylePromises = styleFiles.map(async (file) => {
      const stylePath = path.join(stylesDir, file);
      return await fs.readFile(stylePath, 'utf8');
    });

    const combinedStyleData = (await Promise.all(stylePromises)).join('\n');
    await fs.writeFile(
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
    await fs.mkdir(goalDir, { recursive: true });
    console.log('success');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

main();

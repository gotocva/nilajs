
const fs = require('fs');
const mkdirp = require('mkdirp');

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);

function createFileFromSkeleton(skeletonFilePath, targetFilePath, replacements, appName) {
  fs.readFile(skeletonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the skeleton file:', err);
      return;
    }

    const folders = targetFilePath.split('/');
    folders.pop();
    const textFolders = folders.join("/");
    mkdirp.sync(textFolders, MODE_0755);
    
    // Perform replacements
    const replacedData = replacePlaceholders(data, replacements);

    // Write the new file
    fs.writeFile(targetFilePath, replacedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the new file:', err);
        return;
      }
      const displayPath = targetFilePath.substring(targetFilePath.indexOf(appName));
      console.log(`\x1b[36mcreate\x1b[0m : ${displayPath}`);
    });
  });
}

function replacePlaceholders(content, replacements) {
  // Replace each placeholder with its corresponding value
  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{${placeholder}}`, 'g');
    content = content.replace(regex, value);
  }
  return content;
}

module.exports = {
    createFileFromSkeleton
}
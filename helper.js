
const fs = require('fs');
const mkdirp = require('./lib/mkdirp');
const path = require("path");
const { resolve } = require('path');
const { readdir } = require('fs').promises;

const LOG_COLORS = {
  BLACK : `\x1b[30m`,
  RED : `\x1b[31m`,
  GREEN : `\x1b[32m`,
  YELLOW : `\x1b[33m`,
  BLUE : `\x1b[34m`,
  MAGENTA : `\x1b[35m`,
  CYAN : `\x1b[36m`
}

const MODE_0666 = 0o0666;
const MODE_0755 = 0o0755;

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
      console.log(`${LOG_COLORS.GREEN}created : ${LOG_COLORS.BLACK} ${displayPath}`);
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


async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function write(file, str, mode) {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 }, 'utf-8');
  console.log(`\x1b[36mcreate\x1b[0m : ${file}`);
}

/**
 * 
 * @param filePath 
 * @param data 
 */
const writeFile = (data, filePath) => {
  fs.writeFile(`${process.cwd()}/${filePath}`, data, 'utf8', (err) => {
  if (err) {
      console.error('Error generating new controller:', err);
      return;
  }
  console.log(`\x1b[36mcreated\x1b[0m : ${filePath}`);
  });
}

/**
 * 
 * @param content 
 * @param replacements 
 * @returns 
 */
const render = (content, replacements) => {
  // Replace each placeholder with its corresponding value
  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{${placeholder}}`, 'g');
    content = content.replace(regex, value);
  }
  return content;
}

/**
 * 
 * @param {*} filePath 
 * @returns 
 */
const checkFileExists = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      resolve(true);
    } else {
      resolve(false);
    }
  })
}

module.exports = {
    createFileFromSkeleton,
    write,
    getFiles,
    writeFile,
    render,
    checkFileExists,
    LOG_COLORS
}
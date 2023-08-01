#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");

const { createFileFromSkeleton } = require('./helper');

const program = new Command()

program.name("sivcli").description("SIVCLI Commands for Express Boilerplate").version("0.0.1")

const MODE_0666 = 0o0666;
const MODE_0755 = 0o0755;

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 }, 'utf-8');
    console.log(`\x1b[36mcreate\x1b[0m : ${file}`);
}

const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

const createApp = async (name) => {
    
    const replacements = {
        NAME: name, // Replace {NAME} with 'App name'
    };

    const files = await getFiles(`${__dirname}/skeletons`);
    files.forEach((file) => {
        const tgFile = file.substring(file.indexOf("skeletons/") + 10);
        createFileFromSkeleton(`${__dirname}/skeletons/${tgFile}`, `${process.cwd()}/${name}/${tgFile}`, replacements, name);
    });
    
}


program
.command("create:app")
.description("Build REST application")
.argument("<appName>", "Application Name")
.action(async (appName) => {
    createApp(appName);
})

program.parse(process.argv)
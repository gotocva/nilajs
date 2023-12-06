const {  createFileFromSkeleton, write, getFiles, writeFile, render, checkFileExists } = require('./helper');
const { sampleController } = require('./skeletons/controller');
const { sampleModel } = require('./skeletons/model');
const { sampleRoutes } = require('./skeletons/route');

const prettier = require('./lib/prettier');

const fs = require('fs');

/**
 * 
 * @param {*} ModuleName 
 */
const createModule = async (moduleName) => {
    moduleName = moduleName.toLowerCase();
    // replacements object
    const replacements = {
        NAME: moduleName.toLowerCase(),
        CAPSNAME: moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
    }
    // Write the new model file
    writeFile(render(sampleModel, replacements), `${moduleName}.model.js`);
    // Write the new controller file
    writeFile(render(sampleController, replacements), `${moduleName}.controller.js`);
    // Write the new routes file
    writeFile(render(sampleRoutes, replacements), `${moduleName}.routes.js`);
}

module.exports = {
    createModule
}
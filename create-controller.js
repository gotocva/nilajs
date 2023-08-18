const {  createFileFromSkeleton, write, getFiles, writeFile, render, checkFileExists } = require('./helper');
const { sampleController } = require('./skeletons/controller');

/**
 * 
 * @param {*} controllerName 
 */
const createController = async (controllerName) => {
    const isProjectDir = await checkFileExists(process.cwd()+'/package.json');
    if (isProjectDir == true) {
        const replacements = {
            NAME: controllerName.toLowerCase(),
            CAPSNAME: controllerName.charAt(0).toUpperCase() + controllerName.slice(1)
        }
        // Write the new controller file
        writeFile(render(sampleController, replacements), `src/controllers/${controllerName}.controller.js`);
    } else {
        console.log('Please run the command in project directory');
    }
}

module.exports = {
    createController
}
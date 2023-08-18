const { writeFile, render, checkFileExists } = require('./helper');
const { sampleModel } = require('./skeletons/model');

/**
 * 
 * @param {*} modelName 
 */
const createModel = async (modelName) => {
    const isProjectDir = await checkFileExists(process.cwd()+'/package.json');
    if (isProjectDir == true) {
        const replacements = {
            NAME: modelName.toLowerCase(),
            CAPSNAME: modelName.charAt(0).toUpperCase() + modelName.slice(1)
        }
        // Write the new model file
        writeFile(render(sampleModel, replacements), `src/models/${modelName}.model.js`);
    } else {
        console.log('Please run the command in project directory');
    }
}

module.exports = {
    createModel
}
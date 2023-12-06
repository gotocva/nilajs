const { writeFile, render, checkFileExists } = require('./helper');
const { sampleModel } = require('./skeletons/model');

/**
 * 
 * @param {*} modelName 
 */
const createModel = async (modelName) => {
    const replacements = {
        NAME: modelName.toLowerCase(),
        CAPSNAME: modelName.charAt(0).toUpperCase() + modelName.slice(1)
    }
    // Write the new model file
    writeFile(render(sampleModel, replacements), `${modelName}.model.js`);
}

module.exports = {
    createModel
}
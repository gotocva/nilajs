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
    const isProjectDir = await checkFileExists(process.cwd()+'/package.json');
    if (isProjectDir == true) {
        moduleName = moduleName.toLowerCase();
        // replacements object
        const replacements = {
            NAME: moduleName.toLowerCase(),
            CAPSNAME: moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
        }
        // Write the new model file
        writeFile(render(sampleModel, replacements), `src/models/${moduleName}.model.js`);
        // Write the new controller file
        writeFile(render(sampleController, replacements), `src/controllers/${moduleName}.controller.js`);
        // Write the new routes file
        writeFile(render(sampleRoutes, replacements), `src/routes/${moduleName}.routes.js`);

        try {
            let routesIndexData = fs.readFileSync(`${process.cwd()}/src/routes/index.js`, 'utf8');
            let replaceData = `
    import ${moduleName}Router from './${moduleName}.routes'; \n

    export const routeLoader = (app) => { \n \n

        // ${moduleName} routes injection
        app.use('/${moduleName}', ${moduleName}Router)`;

            routesIndexData = routesIndexData.replace('export const routeLoader = (app) => {', replaceData);
            const finalData = await prettier.format(routesIndexData, { semi: false, parser: "babel" });
            writeFile(finalData, `src/routes/index.js`);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('Please run the command in project directory');
    }
}

module.exports = {
    createModule
}
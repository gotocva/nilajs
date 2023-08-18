const {  createFileFromSkeleton, write, getFiles, writeFile, render, LOG_COLORS } = require('./helper');

/**
 * 
 * @param {*} appName 
 */
const createApp = async (appName) => {
    const replacements = {
        NAME: appName, // Replace {NAME} with 'App name'
    };
    const CODE_DIR_NAME = 'boilerplate';
    const files = await getFiles(`${__dirname}/${CODE_DIR_NAME}`);
    files.forEach((file) => {
        const tgFile = file.substring(file.indexOf(CODE_DIR_NAME+"/") + 12);
        if (tgFile.indexOf('node_modules') == -1 && tgFile.indexOf('dist') == -1 && tgFile.indexOf('logs') == -1) {
            createFileFromSkeleton(`${__dirname}/${CODE_DIR_NAME}/${tgFile}`, `${process.cwd()}/${appName}/${tgFile}`, replacements, appName);
        }
    });
    setTimeout(() => {
        console.log('\n');
        console.log(`${LOG_COLORS.GREEN} ${appName} created successfully...`);
        console.log(`${LOG_COLORS.GREEN} cd ${appName} \n npm install \n npm start`)
    }, 5000);
}

module.exports = {
    createApp
}
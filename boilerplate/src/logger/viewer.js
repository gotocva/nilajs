const { appConfig } = require("@config/app.config");

const fs = require('fs');
const basicAuth = require('express-basic-auth');
const { spawn } = require('child_process');

// Middleware for basic authentication
export const auth = basicAuth({
    users: { [appConfig.PM2_LOGS_USERNAME]: appConfig.PM2_LOGS_PASSWORD },
    challenge: true,
    realm: 'Restricted Area',
});

/**
 * @author sivabharathy
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const logViewer = (req, res) => {
    const n = req.query.limit || 50;
    res.write(`\n Lines : ${n}. ?limit=50 - pass the query parameter limit to get more logs \n \n`)
    if (req.params.type == 'pm2') {
        const tailProcess = spawn('tail', ['-n', n, appConfig.PM2_LOGS_DIRECTORY]);
        handler(req, res, tailProcess);
    } else if (req.params.type == 'access') {
        const tailProcess = spawn('tail', ['-n', n, process.cwd()+'/logs/access.log']);
        handler(req, res, tailProcess);
    } else {
        const tailProcess = spawn('tail', ['-n', n, process.cwd()+'/logs/error.log']);
        handler(req, res, tailProcess);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} tailProcess 
 */
const handler = (req, res, tailProcess) => {
    tailProcess.stdout.on('data', (data) => {
        res.write(data);
    });

    tailProcess.stderr.on('data', (data) => {
        console.error(`tail process stderr: ${data}`);
        res.status(500).send('Error reading file');
    });

    tailProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`tail process exited with code ${code}`);
            res.status(500).send('Error reading file');
        } else {
            res.end();
        }
    });
}
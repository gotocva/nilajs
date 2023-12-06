



const fs = require('fs');
const path = require('path');

const swaggerDocs = {
    "swagger": "2.0",
    "info": {
        "version": "3.0.0",
        "title": "Nilajs API documentation ",
        "description": "Nilajs API Documentation using swagger"
    },
    "servers": [
        {
          "url": "http://localhost:3000"
        }
    ]
}
// Specify the directory containing your JavaScript files
const directoryPath = process.cwd()+'/swagger/docs';

const loadSwaggerDocs = async () => {
    return new Promise((resolve, reject) => {
        // Read all files in the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
            console.error('Error reading directory:', err, process.cwd());
            reject(false);
            }
            // Filter out non-JavaScript files (adjust the filter as needed)
            const jsFiles = files.filter(file => file.endsWith('.json'));
        
            let docs = {};
            let definitions = {};

            for (let i = 0; i < jsFiles.length; i++) {
                const jsFile = jsFiles[i];
                const filePath = path.join(directoryPath, jsFile);
                const document = require(filePath);
                Object.assign(docs, document.docs);
                Object.assign(definitions, document.definition);
            }

            swaggerDocs.paths = docs;
            swaggerDocs.definitions = definitions;
            resolve(swaggerDocs);
        });
    })
}

module.exports = loadSwaggerDocs;
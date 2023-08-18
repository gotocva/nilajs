


## NilaJS REST api framework


```bash
npm i nilajs -g
```

```bash
nila create:app <appName>
```

Steps to run the application REST api

```bash
cd <appName>
npm install
npm start
```

To use nila cli to generate files 

Run below command to generate a new module with basic CRUD operations


```bash
nila create:module <moduleName>
```

Run below command to generate a new controller 

```bash
node nila create:controller <controllerName>
```

Run below command to generate a new model 

```bash
node nila create:model <modelName>
```

### Directory structure

```bash
[-] src
   |-- config
   |   |-- app.config.js
   |   |-- db.config.js
   |-- controllers
   |   |-- user.controller.js
   |-- database
   |   |-- mongoose.db.js
   |-- logger
   |   |-- index.js
   |   |-- pm2-viewer.js
   |-- middlewares
   |   |-- auth.middleware.js
   |   |-- objectid.middleware.js
   |-- models
   |   |-- user.model.js
   |-- routes
   |   |-- index.js
   |   |-- user.routes.js
   |-- utils
   |   |-- email.util.js
   |   |-- encryption.js
   |   |-- response.js
   |   |-- xss.js
   |-- validators
   |   |-- user.validator.js
   |-- express.js
   |-- index.js
[-] tests
 - .babelrc
 - .env-sample
 - .eslintrc
 - .gitignore
 - ecosystem.config.json
 - jest.config.js
 - jsconfig.json
 - nila
 - package-lock.json
 - package.json
 - README.md
```

Let's go through each folder and its purpose:

1. src: This is the main folder that contains the source code of the application.

    1. config: This folder holds configuration files, such as database configurations, environment variables, logging settings, etc.

    2. controllers: This folder contains the controllers responsible for handling HTTP requests, processing data, and interacting with services.

    3. models: This folder houses the data models or schema definitions for your application's data layer.

    4. routes: This folder contains the route definitions for different endpoints of your API or application.

    5. services: This folder holds the business logic or services that are responsible for processing data, interacting with models, and performing application-specific operations.

    6. utils: This folder contains utility files and helper functions that can be used across different parts of your application.

2. tests: This folder is dedicated to storing your application's unit tests, integration tests, or any other test files.

3. package.json: This file defines your project's metadata, dependencies, and scripts.

4. .env: This file is used to store environment-specific configuration variables. It is usually not committed to version control and can contain sensitive information like API keys or database credentials.

5. index.js: This file serves as the entry point of your application. It typically sets up the server, establishes database connections, and initializes other essential components.

# Configuration

Configure the application and database details in ```.env``` or ```config``` files


> **Note**:
Configuration values configured in ```.env``` has the first priority, if you need to use the config.js values then skip those keys on ```.env``` file



```bash title=".env"
NODE_ENV=dev

PORT=PORT_TO_RUN


SOCKET_CORS_ORIGIN='http://localhost:3000'

# URL of the Mongo DB
MONGODB_URI="CONNECTION_STRING"

SEARCH_API_KEY=GOOGLE_SEARCH_API_KEY

TELEGRAM_BOT_TOKEN="TELEGRAM_BOT_TOKEN"

# SMTP credentials
SMTP_EMAIL_FROM=contact@sivabharathy.in
SMTP_HOST='smtp.zoho.com'
SMTP_PORT=465
SMTP_USERNAME=contact@sivabharathy.in
SMTP_PASSWORD=

PM2_LOGS_DIRECTORY='/Users/siva/.pm2/logs/npm-start-out.log'
PM2_LOGS_USERNAME='admin'
PM2_LOGS_PASSWORD='admin'

```

```
|-src
|--config
|---app.config.js
|---db.config.js
```


```js title="app.config.js"
export const appConfig = {
    // application name inside the project
    NAME : env.APP_NAME || 'Application name',

    NODE_ENV : env.NODE_ENV || 'development',
    PORT : env.PORT || '8080',

    SMTP_EMAIL_FROM : env.SMTP_EMAIL_FROM || 'contact@sivabharathy.in',
    SMTP_HOST : env.SMTP_HOST || 'smtp.zoho.com',
    SMTP_PORT : env.SMTP_PORT || 465,
    SMTP_USERNAME : env.SMTP_USERNAME || 'contact@sivabharathy.in',
    SMTP_PASSWORD : env.SMTP_PASSWORD || '',


    TELEGRAM_BOT_TOKEN : env.TELEGRAM_BOT_TOKEN || '',

    API_RATE_LIMIT_TIME : 15, // 15 minutes
    API_RATE_LIMIT : 100, // 100 requests for every 15 minutes

    LOG_DIRECTORY: 'logs',

    PM2_LOGS_DIRECTORY : env.PM2_LOGS_DIRECTORY || '/Users/siva/.pm2/logs/npm-start-out.log',
    PM2_LOGS_USERNAME: env.PM2_LOGS_USERNAME || 'admin',
    PM2_LOGS_PASSWORD: env.PM2_LOGS_PASSWORD || 'admin',
}
```

```js title="db.config.js"
export const dbConfig = {
    
    MONGODB_URI : env.MONGODB_URI || '',

    CONNECTION_OPTIONS : { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
}
```

```
MIT License

Copyright (c) 2023 Sivabharathy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
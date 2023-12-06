


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
   |-- [-] app
   |        |-- index.js
   |-- [-] config
   |        |-- mongoose.js
   |-- [-] cron
   |        |-- index.js
   |-- [-] modules
   |        |-- admin
   |            |-- admin.controller.js
   |            |-- admin.model.js
   |            |-- admin.routes.js
   |-- [-] public
   |-- [-] swagger
   |        |-- docs
   |        |-- index.js
   |-- [-] test
   |        |-- admin.test.js
   |        |-- app.test.js
   |-- [-] utils
   |        |-- crypto.js
   |        |-- logs.js
   |        |-- params-validator.js
   |        |-- response.handler.js
   |-- [-] views
   |        |-- index.pug
   |        |-- layout.pug
   |-- index.js
   |- .env.example
   |- .eslintrc
   |- ecosystem.config.json
   |- jest.config.js
   |- package-lock.json
   |- package.json
   |- README.md
```

Let's go through each folder and its purpose:

```Coming soon```

# Configuration

Configure the application and database details in ```.env```file



```bash title=".env"

PORT=8000

MONGODB_URL="mongodb://localhost:27017/sparkportal"

JWT_SECRET='nilajs'

BCRYPT_SALT_ROUND=10

SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=admin

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
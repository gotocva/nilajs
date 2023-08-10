---
sidebar_position: 3
---

# Directory structure


Below is the default directory structure of NilaJS

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


### About directory structure

The default NilaJS application structure is intended to provide a great starting point for both large and small applications. But you are free to organize your application however you like. NilaJS imposes almost no restrictions on where any given file or function is located.

* NilaJS strictly follows ```MVC``` pattern to organise the code folder structure's


### root directory

### - src
The ```src``` directory contains the core code of your application. We'll explore this directory in more detail soon; however, almost all of the files, functions in your application will be in this directory.

### - config

### - controllers

### - database

### - logger

### - middlewares

### - models

### - routes

### - utils

### - validators
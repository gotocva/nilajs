---
sidebar_position: 3
title: Logger
---


NilaJS use's [nila-logger](https://www.npmjs.com/package/nila-logger) package for logging

***

## Configuration

```bash
[-] src
   |-- config
   |   |-- app.config.js
```

In above path, app.config.js has the loggger configuration 

```js
LOG_DIRECTORY: 'logs',

PM2_LOGS_DIRECTORY : env.PM2_LOGS_DIRECTORY || '/Users/siva/.pm2/logs/npm-start-out.log',
PM2_LOGS_USERNAME: env.PM2_LOGS_USERNAME || 'admin',
PM2_LOGS_PASSWORD: env.PM2_LOGS_PASSWORD || 'admin',

```

```LOG_DIRECTORY``` Directory where log files stored

```PM2_LOGS_DIRECTORY``` change the server's PM2 logs directory path 

```PM2_LOGS_USERNAME``` change the username

```PM2_LOGS_PASSWORD``` change the password

***

## Usage 

```js
import { LOG } from '@log';
```

Import LOG class using above statement.

```js
LOG.error(`Content to be logged`);
LOG.debug(`Content to be logged`);
LOG.warn(`Content to be logged`);
LOG.info(`Content to be logged`);
```
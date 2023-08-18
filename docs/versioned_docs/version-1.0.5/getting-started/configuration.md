---
sidebar_position: 2
---

# Configuration

Configure the application and database details in ```.env``` or ```config``` files

:::info

Configuration values configured in ```.env``` has the first priority, if you need to use the config.js values then skip those keys on ```.env``` file

:::

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
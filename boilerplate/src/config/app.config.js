import dotenv from 'dotenv';

const env = dotenv.config().parsed;

/**
 * @author sivabharathy
 * 
 * application configurations 
 */
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

    CACHE: true,

    API_RATE_LIMIT_TIME : 15, // 15 minutes
    API_RATE_LIMIT : 100, // 100 requests for every 15 minutes

    LOG_DIRECTORY: 'logs',

    PM2_LOGS_DIRECTORY : env.PM2_LOGS_DIRECTORY || '/Users/siva/.pm2/logs/npm-start-out.log',
    PM2_LOGS_USERNAME: env.PM2_LOGS_USERNAME || 'admin',
    PM2_LOGS_PASSWORD: env.PM2_LOGS_PASSWORD || 'admin',
}


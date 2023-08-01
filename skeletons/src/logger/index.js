
import path from 'path';
import fs from 'fs';
import { appConfig } from '@config/app.config';

/**
 * @author sivabharathy
 * 
 * @param {*} dirname 
 * @returns 
 */
const mkdirsSync = function(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
}
mkdirsSync(appConfig.LOG_DIRECTORY);

const errorLog = require('nila-logger').createSimpleLogger({
  logFilePath: appConfig.LOG_DIRECTORY+'/error.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss'
});

const accessLog = require('nila-logger').createSimpleLogger({
  logFilePath: appConfig.LOG_DIRECTORY+'/access.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss'
});


/**
 * @author sivabharathy
 * 
 * @class Logger
 */
class Logger {

  error(errorMessage) {
    errorLog.error(errorMessage);
  }

  debug(message) {
    accessLog.debug(message);
  }

  warn(message) {
    accessLog.warn(message);
  }

  info(message) {
    accessLog.info(message);
  }

}


export const LOG = new Logger();




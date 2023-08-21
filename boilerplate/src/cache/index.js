import { appConfig } from '@config/app.config';


const cache = require('nila-cache');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const cacheMiddleware = (req, res, next) => {
    res.setHeader( 'X-Powered-By', 'Nila JS' );
    if (appConfig.CACHE == true && req.method == 'GET' && cache.get(req.path)) {
        res.set('response-from-cache', true);
        return res.status(200).json(JSON.parse(cache.get(req.path)));
    } else {
        next();
    }
}

/**
 * 
 * @param {*} key 
 * @param {*} value 
 */
export const storeCache = (key, value) => {
    cache.store(key, value);
}

/**
 * 
 * @param {*} key 
 */
export const removeCache = (key) => {
    cache.del(key);
}

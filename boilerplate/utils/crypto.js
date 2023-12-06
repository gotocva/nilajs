const crypto = require('crypto');

const secretKey = 'e582a24c2489d724d20526183712df4f446ac43bccfcc051256f801ee809803b';
const algorithm = 'sha256';
const type = 'hex';

/**
 * function to create HMAC encrypted string 
 * @param {*} data 
 * @returns HMAC string
 */
function createHMAC(data) {
  if (typeof data != 'String' && typeof data == 'object'){
    data = JSON.stringify(data);
  } 
  return crypto.createHmac(algorithm, secretKey).update(data).digest(type);
}

/**
 * function to verify HMAC encoded string with data
 * @param {*} hmac 
 * @param {*} data 
 * @returns Boolean true|false
 */
function verifyHMAC(hmac, data) {
    const receivedHmac = createHMAC(data);
    return crypto.timingSafeEqual(Buffer.from(hmac, type), Buffer.from(receivedHmac, type));
}

module.exports = {
    createHMAC, 
    verifyHMAC
}

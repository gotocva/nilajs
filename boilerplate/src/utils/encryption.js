import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * @author sivabharathy
 * 
 * @param {*} text 
 * @param {*} encryptionKey 
 * @returns 
 */
export function encrypt(text, encryptionKey = ENCRYPTION_KEY) {
  let iv = Buffer.from(crypto.randomBytes(IV_LENGTH)).toString('hex').slice(0, IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv + ':' + encrypted.toString('hex');
}

/**
 * @author sivabharathy
 * 
 * @param {*} text 
 * @param {*} encryptionKey 
 * @returns 
 */
export function decrypt(text, encryptionKey = ENCRYPTION_KEY) {
  try {
    let textParts = text.includes(':') ? text.split(':') : [];
    let iv = Buffer.from(textParts.shift() || '', 'binary');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  catch (error) {
    if (error) {
      console.log("error in decrypt")
    }
  }
}
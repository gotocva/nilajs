const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const clientInstances = new Map(); // id => Client



/**
 * Function to create a new WhatsApp client
 * @param {*} clientId 
 * @returns 
 */
function createWhatsAppClient(clientId) {

    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: clientId // stored in .wwebjs_auth/main-session/
        }),
        puppeteer: {
            headless: true, // or false to view browser
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });
    client.on('qr', async (qr) => {
        const qrImage = await qrcode.toDataURL(qr);
        client.qrCodeImage = qrImage; // Store for API response
    });

    client.on('ready', async () => {
        console.log(`[✓] Client '${clientId}' is ready!`);
    });

    client.on('authenticated', () => {
        console.log(`[✓] Client '${clientId}' authenticated successfully.`);
    });

    client.on('auth_failure', (msg) => {
        console.error(`[X] Client '${clientId}' auth failure:`, msg);
    });

    client.on('disconnected', (reason) => {
        console.log(`[!] Client '${clientId}' disconnected:`, reason);
        clientInstances.delete(clientId);
    });

    client.on('message', (msg) => {
        console.log(`[Message][${clientId}]`, msg.from, msg.body, `type: ${msg.type}`);
        // TODO: Handle different message types
    });

    client.initialize();
    clientInstances.set(clientId, client);
    return client;
}


/**
 * Get or create client instance
 * @param {*} clientId 
 * @returns 
 */
function getClient(clientId) {
    return clientInstances.get(clientId) || createWhatsAppClient(clientId);
}

/**
 * 
 * @param {*} clientId 
 * @returns 
 */
function generateQrCode(clientId) {
    const client = getClient(clientId);
    if (client.info) {
        return Promise.resolve('Client is already authenticated.');
    }
    return new Promise((resolve, reject) => {
        client.on('qr', async (qr) => {
            try {
                const qrImage = await qrcode.toDataURL(qr);
                resolve(qrImage);
            } catch (error) {
                reject(error);
            }
        });
    });
}

/**
 * 
 * @param {*} clientId
 * @param {*} number 
 * @param {*} message 
 * @returns 
 */
function sendMessage(clientId, number, message) {

    const client = clientInstances.get(clientId);
    if (!client || !client.info) {
        console.error(`Client is not connected.`);
        return;
    }
    if (!number || !message) {
        console.error(`Number and message are required.`);
        return;
    }
    client.sendMessage(number, message)
        .then(response => {
            console.log('Message sent successfully:', response);
            return true;
        })
        .catch(error => {
            console.error('Error sending message:', error);
            return false;
        });
}


module.exports = { sendMessage, getClient, createWhatsAppClient, clientInstances, generateQrCode };

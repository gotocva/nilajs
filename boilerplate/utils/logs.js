const { Level } = require('level')

// Create a database
const logsDB = new Level('logs', { valueEncoding: 'json' })


class LOG {

    async storeLog(type, message) {
        await logsDB.put(new Date(), { type: type, log: message });
    }

    info(message) {
        this.storeLog('info', message); return true;
    }

    error(message) {
        this.storeLog('error', message); return true;
    }

    debug(message) {
        this.storeLog('debug', message); return true;
    }

    fatal(message) {
        this.storeLog('fatal', message); return true;
    }

    warn(message) {
        this.storeLog('warn', message); return true;
    }

    async list(type) {
        const logs = [];
        // Iterate entries with keys 
        for await (const [key, value] of logsDB.iterator({})) {
            if (value.type == type) {
                logs.push({date: key, log: value.log});
            }
        }
        return logs;
    }
}

const Log = new LOG();

// console.log(Log.info('hello world'));

module.exports = Log;
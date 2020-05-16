const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    transports: []
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

logger.add(new winston.transports.Console({
    format: winston.format.json()
}));



module.exports = logger;
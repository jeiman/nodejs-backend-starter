const winston = require('winston');
const util = require('util');

const logFormatFile = winston.format.printf(info => {
  if (info && info.message && typeof info.message === 'object') {
    try {
      info.message = util.inspect(info.message);
    } catch (error) {
      // catch error
    }
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logFormatConsole = winston.format.printf(info => {
  if (info && info.message && typeof info.message === 'object') {
    try {
      info.message = util.inspect(info.message);
    } catch (error) {
      // catch error
    }
  }

  let log = '';
  log += `${info.level}: ${info.message} `;

  return log;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.json(),
    logFormatFile
  ),
  transports: [
    /**
     * Logs will be stored in project root directory under logs folder
     * - Write to all logs with level `info` and below to `combined.log`
     * - Write all logs error (and below) to `error.log`.
     */
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })

  ],
  exitOnError: false
});

/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (!['test', 'production'].includes(process.env.NODE_ENV)) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.json(),
      logFormatConsole
    )
  }));
}

module.exports = logger;

const logwinston = require("winston");

const { config } = require("../config/config");

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "blue",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const loggerDEV = logwinston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new logwinston.transports.Console({
      level: "debug",
      format: logwinston.format.simple(),
    }),
    new logwinston.transports.Console({
      level: "http",
      format: logwinston.format.combine(
        logwinston.format.colorize({ colors: customLevelsOptions.colors }),
        logwinston.format.simple()
      ),
    }),

    new logwinston.transports.Console({
      level: "info",
      format: logwinston.format.combine(
        logwinston.format.colorize({ colors: customLevelsOptions.colors }),
        logwinston.format.simple()
      ),
    }),

    new logwinston.transports.Console({
      level: "warning",
      format: logwinston.format.combine(
        logwinston.format.colorize({ colors: customLevelsOptions.colors }),
        logwinston.format.simple()
      ),
    }),

    new logwinston.transports.File({
      filename: "./errordev.log",
      level: "error",
      format: logwinston.format.simple(),
    }),

    new logwinston.transports.File({
      filename: "./fataldev.log",
      level: "fatal",
      format: logwinston.format.simple(),
    }),
  ],
});

const loggerPRD = logwinston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new logwinston.transports.Console({
      level: "info",
      format: logwinston.format.combine(
        logwinston.format.colorize({ colors: customLevelsOptions.colors }),
        logwinston.format.simple()
      ),
    }),

    new logwinston.transports.Console({
      level: "warning",
      format: logwinston.format.combine(
        logwinston.format.colorize({ colors: customLevelsOptions.colors }),
        logwinston.format.simple()
      ),
    }),

    new logwinston.transports.File({
      filename: "./errorprd.log",
      level: "error",
      format: logwinston.format.simple(),
    }),

    new logwinston.transports.File({
      filename: "./fatalprd.log",
      level: "fatal",
      format: logwinston.format.simple(),
    }),
  ],
});

const addLogger = (req, res, next) => {
  switch (config.ENVIRONMENT.CURRENT) {
    case "DEV":
      req.logger = loggerDEV;
      break;
    case "PRD":
      req.logger = loggerPRD;
      break;
    default:
      req.logger = loggerDEV;
      break;
  }
  //req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
  // req.logger.debug(`PruebaDebug- ${new Date().toLocaleDateString()}`)

  next();
};

module.exports = { addLogger };

import winston from "winston";
import expressWinston from "express-winston";

const logPrefixer = (loggerType: string) => {
  return winston.format((info) => {
    info.message = `[${loggerType}] ${info.message}`;
    return info;
  })();
};

const loggerFormat = (loggerType: string) => {
  return winston.format.combine(
    winston.format.colorize(),
    logPrefixer(loggerType),
    winston.format.simple(),
  );
};

const loggerTransports = [
  new winston.transports.Console({
    level: "debug",
  }),
  new winston.transports.File({
    filename: "error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "combined.log",
  }),
];

export const logger = winston.createLogger({
  transports: loggerTransports,
  format: loggerFormat("console"),
});

export const expressLogger = expressWinston.logger({
  transports: loggerTransports,
  format: loggerFormat("Express"),
  meta: false,
  msg: "{{req.method}}: ({{res.statusCode}}) in {{res.responseTime}}ms: {{req.url}}",
});

export const prismaLogger = winston.createLogger({
  transports: loggerTransports,
  format: loggerFormat("Prisma"),
});

export const graphqlLogger = winston.createLogger({
  transports: loggerTransports,
  format: loggerFormat("GraphQL"),
});
import { createLogger, transports, LoggerOptions, format } from "winston";
import LokiTransport from "winston-loki";

const options: LoggerOptions = {
  transports: [
    //#section 1 (send logs to loki)
    new LokiTransport({
      host: "http://localhost:3100",
      labels: {
        service: "winston-service",
        env: "dev",
      },
      interval: 5,
      json: true,
      format: format.json(),
      onConnectionError: (err) => console.error(err),
    }),

    // #section 2  (write logs to console)
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.colorize(),
        format.printf(
          (info) =>
            `[${info.level}]: ${info.timestamp}  ${info.message} ${
              info.stack || ""
            }`
        )
      ),
    }),

    //#section 3  (write logs to files)
    new transports.File({
      filename: "error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),

    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
};

export const logger = createLogger(options);

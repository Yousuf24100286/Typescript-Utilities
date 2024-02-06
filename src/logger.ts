import pino from 'pino';

class Logger {
  private static _instance: Logger;

  private static instance: pino.Logger;
  private static level: string = 'info';
  private static messageKey: string | undefined ;
  private static transport: 
    pino.TransportMultiOptions |
    pino.TransportPipelineOptions |
    pino.TransportSingleOptions | undefined;

  private static options: pino.LoggerOptions = {
    formatters: {
      level(label) {
        return { level: label.toUpperCase() };
      }
    },
    timestamp: pino.stdTimeFunctions.epochTime,
    messageKey: Logger.messageKey ? Logger.messageKey : 'msg',
    redact: {
      paths: ['password', 'token'],
      censor: '***',
    },
    level: Logger.level,
    transport: Logger.transport,
  };
  private constructor() {
    Logger.instance = pino(Logger.options);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger._instance = new Logger();
      return Logger._instance;
    } else {
      return Logger._instance;
    }
  }


  public trace(message: string, ...args: any[]) {
    Logger.instance.trace(message, ...args);
  }
  public debug(message: string, ...args: any[]) {
    Logger.instance.debug(message, ...args);
  }
  public info(message: string, ...args: any[]) {
    Logger.instance.info(message, ...args);
  }
  public warn(message: string, ...args: any[]) {
    Logger.instance.warn(message, ...args);
  }
  public error(message: string, ...args: any[]) {
    Logger.instance.error(message, ...args);
  }
  public fatal(message: string, ...args: any[]) {
    Logger.instance.fatal(message, ...args);
  }



  public setLevel(level: string) {
    Logger.level = level;
    Logger.options.level = level;
    Logger.instance = pino(Logger.options);
  }
  
  public setTransport(transport: 
    pino.TransportMultiOptions |
    pino.TransportPipelineOptions |
    pino.TransportSingleOptions) {
    Logger.transport = transport;
    Logger.options.transport = transport;
    Logger.instance = pino(Logger.options);
  }

  public setMessageKey(messageKey: string) {
    Logger.messageKey = messageKey;
    Logger.options.messageKey = messageKey;
    Logger.instance = pino(Logger.options);
  }
}
const logger = Logger.getInstance();

export default logger;
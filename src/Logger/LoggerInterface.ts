export interface LoggerInterface {
  emergency(msg: string): void;
  alert(msg: string): void;
  critical(msg: string): void;
  warning(msg: string): void;
  notice(msg: string): void;
  info(msg: string): void;
  debug(msg: string): void;
  log(level: number, msg: string): void;
}

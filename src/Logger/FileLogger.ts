import { LoggerInterface } from "./LoggerInterface";

export class FileLogger implements LoggerInterface {
  emergency(msg: string): void {
    console.log(msg);
  }
  alert(msg: string): void {
    console.log(msg);
  }
  critical(msg: string): void {
    console.log(msg);
  }
  warning(msg: string): void {
    console.log(msg);
  }
  notice(msg: string): void {
    console.log(msg);
  }
  info(msg: string): void {
    console.log(msg);
  }
  debug(msg: string): void {
    console.log(msg);
  }
  log(level: number, msg: string): void {
    console.log(level);
    console.log(msg);
  }
}

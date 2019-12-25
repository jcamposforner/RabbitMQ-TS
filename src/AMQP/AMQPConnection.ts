import amqp, { Connection } from "amqplib/callback_api";
import AMQPConnectionParameters from "./AMQPConnectionParameters";
import AMQPExchangeParameters from "./AMQPExchangeParameters";

export class AMQPConnection {
  /**
   * Connection Parameters
   * {
   *    host,
   *    protocol
   * }
   */
  private connectionParameters: AMQPConnectionParameters;

  /**
   * AMQP Connection
   */
  private connection: Connection;

  /**
   * AMQP Channel
   */
  private channel: amqp.Channel;

  private currentQueue: string;

  public constructor(parameters: AMQPConnectionParameters) {
    this.connectionParameters = parameters;
  }

  public async connect(): Promise<this> {
    return new Promise((resolve, reject) =>
      amqp.connect(
        `${this.connectionParameters.protocol}://${this.connectionParameters.host}`,
        (err: any, connection: Connection) => {
          if (err) reject(err);
          this.connection = connection;
          resolve(this);
        }
      )
    );
  }

  public createChannel(
    queue: string,
    exchange: AMQPExchangeParameters
  ): Promise<this> {
    return new Promise((resolve, reject) =>
      this.connection.createChannel((err, channel) => {
        if (err) reject(err);
        this.channel = channel;
        this.setConfiguration(queue, exchange);

        resolve(this);
      })
    );
  }

  public sendToQueue(msg: string): boolean {
    return this.channel.sendToQueue(this.currentQueue, Buffer.from(msg));
  }

  public getQueue(): string {
    return this.currentQueue;
  }

  private setConfiguration(queue: string, exchange: AMQPExchangeParameters) {
    this.setQueue(queue);
    this.setExchange(exchange);
  }

  private setQueue(queue: string) {
    this.currentQueue = queue;
    this.channel.assertQueue(queue, { durable: true });
  }

  private setExchange(exchange: AMQPExchangeParameters) {
    this.channel.assertExchange(exchange.exchange, exchange.type, {
      durable: true
    });
  }
}

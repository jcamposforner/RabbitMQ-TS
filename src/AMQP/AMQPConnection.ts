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
  protected connectionParameters: AMQPConnectionParameters;

  /**
   * AMQP Connection
   */
  private connection: Connection;

  private currentQueue: string;

  /**
   * AMQP Channel
   */
  public channel: amqp.Channel;

  public constructor(parameters: AMQPConnectionParameters) {
    this.connectionParameters = parameters;
  }

  public async connect(
    queue: string,
    exchange: AMQPExchangeParameters
  ): Promise<this> {
    return new Promise((resolve, reject) =>
      amqp.connect(
        `${this.connectionParameters.protocol}://${this.connectionParameters.host}`,
        (err: any, connection: Connection) => {
          if (err) reject(err);
          this.connection = connection;
          this.createChannel(reject, queue, exchange, resolve);
        }
      )
    );
  }

  public sendToQueue(msg: string): boolean {
    return this.channel.sendToQueue(this.currentQueue, Buffer.from(msg));
  }

  public publish(
    msg: string,
    severity: string,
    exchange: string,
    options = {}
  ): boolean {
    return this.channel.publish(exchange, severity, Buffer.from(msg), options);
  }

  public getQueue(): string {
    return this.currentQueue;
  }

  protected createChannel(
    reject: (reason?: any) => void,
    queue: string,
    exchange: AMQPExchangeParameters,
    resolve: (value?: this | PromiseLike<this> | undefined) => void
  ) {
    this.connection.createChannel((err, channel) => {
      if (err) reject(err);
      this.channel = channel;
      this.setConfiguration(queue, exchange);
      resolve(this);
    });
  }

  protected setConfiguration(queue: string, exchange: AMQPExchangeParameters) {
    this.setQueue(queue);
    this.setExchange(exchange);
  }

  protected setQueue(queue: string) {
    this.currentQueue = queue;
    this.channel.assertQueue(queue, { durable: true });
  }

  protected setExchange(exchange: AMQPExchangeParameters) {
    this.channel.assertExchange(exchange.exchange, exchange.type, {
      durable: true
    });
  }
}

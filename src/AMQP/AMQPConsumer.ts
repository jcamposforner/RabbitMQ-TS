import { LoggerInterface } from "../Logger/LoggerInterface";
import { AMQPConnection } from "./AMQPConnection";

export default class AMQPConsumer {
  public constructor(
    protected consumer: AMQPConnection,
    protected logger: LoggerInterface
  ) {
    this.consumer.channel.consume(this.consumer.getQueue(), msg => {
      if (!msg) return;
      this.consumer.channel.ack(msg);
    });
  }
}

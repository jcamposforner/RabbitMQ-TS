import { AMQPConnection } from "./AMQP/AMQPConnection";
import { AMQPTypes } from "./AMQP/AMQPTypes";

async function run(): Promise<AMQPConnection> {
  const amqpClient = await new AMQPConnection({
    protocol: "amqp",
    host: "localhost"
  }).connect();
  const channel = await amqpClient.createChannel("messages", {
    exchange: "exchanged",
    type: AMQPTypes.DIRECT
  });

  if (
    channel.sendToQueue(
      JSON.stringify({
        class: "ClassName",
        message: { name: "Jesus", surname: "Campos" }
      })
    )
  ) {
    console.log(`Message sended to ${amqpClient.getQueue()}`);
  }
  return amqpClient;
}

run();

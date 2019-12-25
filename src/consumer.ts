import { AMQPConnection } from "./AMQP/AMQPConnection";
import { AMQPTypes } from "./AMQP/AMQPTypes";
import AMQPConsumer from "./AMQP/AMQPConsumer";
import { FileLogger } from "./Logger/FileLogger";

async function run(): Promise<AMQPConnection> {
  const amqpClient = await createAMQPClient();

  if (
    amqpClient.sendToQueue(
      JSON.stringify({
        class: "ClassName",
        message: { name: "Jesus", surname: "Campos" }
      })
    )
  ) {
    console.log(`Message sended to ${amqpClient.getQueue()}`);
  }

  new AMQPConsumer(amqpClient, new FileLogger());
  return amqpClient;

  async function createAMQPClient() {
    return await new AMQPConnection({
      protocol: "amqp",
      host: "localhost"
    }).connect("messages", {
      exchange: "exchanged",
      type: AMQPTypes.DIRECT
    });
  }
}

run();

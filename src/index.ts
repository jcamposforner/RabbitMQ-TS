import { AMQPConnection } from "./AMQP/AMQPConnection";
import { AMQPTypes } from "./AMQP/AMQPTypes";

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

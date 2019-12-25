import { AMQPTypes } from "./AMQPTypes";

export default interface AMQPExchangeParameters {
  exchange: string;
  type: AMQPTypes;
}

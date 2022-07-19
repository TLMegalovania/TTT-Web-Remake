import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";

const conn = new HubConnectionBuilder()
  .withUrl("/ws", {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

export { conn };

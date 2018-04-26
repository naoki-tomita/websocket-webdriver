import { MessageType, ElementInfo, Message } from "../common/Types";

const ws = new WebSocket(`ws://${location.hostname}:8081`);

ws.addEventListener("open", () => {
  // ws.send("CONNECTED");
});

ws.addEventListener("close", () => {

});

ws.addEventListener("error", () => {

});

ws.addEventListener("message", data => {
  const message = parseMessage(data.data);
  const result = procMessage(message);
  ws.send(JSON.stringify(result));
});

function parseMessage(message: string): Message {
  try {
    const parsedData = JSON.parse(message);
    const { type, data, additionalData } = parsedData;
    switch (type) {
      case MessageType.EVAL:
        return {
          type,
          data,
          additionalData,
        };
      case MessageType.ELEMENT:
        return {
          type,
          data,
        }
      default:
        return {
          type: MessageType.UNKNOWN,
        };
    }
  } catch (e) {
    return {
      type: MessageType.UNKNOWN,
    };
  }
}

function procMessage(message: Message) {
  switch(message.type) {
    case MessageType.EVAL:
      return execFunction(message.data, message.additionalData);
    case MessageType.ELEMENT:
      return findElement(message.data);
    default:
      return;
  }
}

function execFunction(func: string, params: any) {
  return new Function(func).apply(window, params);
}

function findElement(selector: string): ElementInfo {
  const el = document.querySelector(selector);
  return {
    id: el.id,
    classNames: el.className.split(" "),
    tag: el.tagName.toLowerCase(),
    html: el.innerHTML,
  }
}

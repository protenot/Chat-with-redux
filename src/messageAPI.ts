import { State, Action, Message, MessageList } from "./types";
const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json",
};

// /**
//  * @return {Object[]} messagesList
//  */
export async function getMessagesList() {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: MessageList) =>
      Object.values(data).map((el: Message) => ({
        ...el,
        date: new Date(el.date),
      })),
    )
    .catch(() => {
      throw new Error("Fail to get messages");
    });
}

// /**
//  * @param {Object} data
//  * @param {string} data.nickname
//  * @param {string} data.message
//  * @returns {boolean}
//  */
export async function sendMessage(data: Message): Promise<boolean> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      date: new Date(),
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function observeWithXHR(cb) {
  // https://firebase.google.com/docs/reference/rest/database#section-streaming
  const xhr = new XMLHttpRequest();
  let lastResponseLength = 0;

  xhr.addEventListener("progress", () => {
    // console.log("xhr body", xhr.response);
    const body = xhr.response.substr(lastResponseLength);
    lastResponseLength = xhr.response.length;

    const eventType = body.match(/event: (.+)/)[1];
    const data = JSON.parse(body.match(/data: (.+)/)[1]);

    if (eventType === "put") {
      cb(data.data);
    }
  });

  xhr.open(
    "POST",
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
    true,
  );
  xhr.setRequestHeader("Accept", "text/event-stream");

  xhr.send();
}

export function observeWithEventSource(cb: (...args: [any]) => void): void {
  // https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
  );

  evtSource.addEventListener("put", (ev) => cb(JSON.parse(ev.data).data));
}

/*  window.sendMessage = sendMessage;
window.getMessagesList = getMessagesList;
window.observeWithXHR = observeWithXHR;
window.observeWithEventSource = observeWithEventSource; */

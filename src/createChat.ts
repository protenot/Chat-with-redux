import { getMessagesList, sendMessage } from "./messageAPI";
import { showMessages, createUser, deleteMessage } from "./action";
import { Message, MessageList } from "./types";
import { store } from "./redux";
import { emojiProvider } from "emoji-provider";
//const {emojiProvider} =require( 'emoji-provider');
export async function loadMessagesList(): Promise<void> {
  console.log("222");
  try {
    const messages: MessageList = await getMessagesList();
    //console.log(messages[1420].date)

    store.dispatch(showMessages(messages.slice(-30) ?? []));
  } catch (error) {
    console.log("No messages");
    //alert("Error");
  }
}

export function createMessageMarkup(): void {
  const messageContainer: HTMLDivElement | null =
    document.querySelector(".message-container");

  console.log(messageContainer);

  const userNameInput: HTMLInputElement | null =
    document.querySelector(".username-input");
  console.log(userNameInput);
  //const dateOfMessage =  document.querySelector(".message-date");
  const { messages, name, date } = store.getState();

  //console.log(messages);
  //console.log(name);

  if (messageContainer) {
    // console.log(messageContainer);
    messageContainer.innerHTML = "";
  }
  console.log("112");

  messages.forEach((message: Message) => {
    const date: Date = new Date(message.date);
    const messageTemplate: any = `
        <div class = 'message'>
            <p class = "message-name">${message.name}</p>
            <p class = "message-text">${emojiProvider.replaceEmoticonsWithEmojis(
              message.message,
            )}</p>
            <button class = "delete-button">Delete</button>
            <p class = "message-date">${date.toLocaleString()}</p>
            </div>
        `;
    //console.log(messageTemplate);
    if (messageContainer) {
      console.log("113");
      messageContainer.insertAdjacentHTML("beforeend", messageTemplate);

      //  console.log(messageContainer);
    }
  });
  console.log(messageContainer);
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if (userNameInput) {
      userNameInput.value = name;
    }
  }
}
export function startListeners(): void {
  console.log("hello");
  const textArea: HTMLDivElement | null = document.querySelector(".text-area");
  const userNameInput: HTMLInputElement | null =
    document.querySelector(".username-input");
  const textButton: HTMLButtonElement | null =
    document.querySelector(".text-button");
  if (textButton) {
    //доавляем слушателя на кнопку отправки текста
    textButton.addEventListener("click", async () => {
      if (textArea) {
        const textMessage = textArea.innerHTML.trim();

        //console.log(textMessage);
        if (!textMessage.length) {
          return;
        }
        const message: Message = {
          message: textMessage,
          name: store.getState().name,
          date: new Date(),
        };
        try {
          await sendMessage(message);
          textArea.innerHTML = "";
        } catch (error) {
          alert("Error");
        }
      }
    });
  }
  const nameButton: HTMLButtonElement | null =
    document.querySelector(".name-button");
  if (nameButton) {
    //доавляем слушателя на кнопку отправки имени
    nameButton.addEventListener("click", () => {
      if (userNameInput) {
        const userName = userNameInput.value.trim();

        if (!userName) {
          alert("Enter username");
          return;
        }
        store.dispatch(createUser(userName));
      }
    });
  }
  const container: HTMLDivElement | null =
    document.querySelector(".message-container");
  container?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement) {
      const isButton = event.target.tagName === "BUTTON";

      if (!isButton) {
        return;
      }
      console.log(event.target);
      (event.target.closest(".message") as HTMLElement).remove();
      //store.dispatch(deleteMessage())
    }
  });
}

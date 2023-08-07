import { getMessagesList, sendMessage } from "./messageAPI";
import { showMessages, createUser } from "./action";
import { Message } from "./types";
import { store } from "./redux";

export async function loadMessagesList(): Promise<void> {
  try {
    const messages = await getMessagesList();
    store.dispatch(showMessages(messages.slice(-20) ?? []));
  } catch (error) {
    console.log("No messages");
    //alert("Error");
  }
}

export function createMessageMarkup(): void {
  console.log("hello");
  const messageContainer: HTMLDivElement | null =
    document.querySelector(".message-container");

  console.log(messageContainer);

  const userNameInput: HTMLInputElement | null =
    document.querySelector(".username-input");
  console.log(userNameInput);
  const { messages, name } = store.getState();
  console.log(messages);
  console.log(name);

  if (messageContainer) {
    console.log(messageContainer);
    messageContainer.innerHTML = "";
  }
  console.log("112");

  messages.forEach((message: Message) => {
    const messageTemplate: any = `
        <div class = 'message'>
            <p class = "message-name">${message.name}</p>
            <p class = "message-text">${message.message}</p>
        </div>
        `;
    console.log(messageTemplate);
    if (messageContainer) {
      console.log("113");
      messageContainer.insertAdjacentHTML("beforeend", messageTemplate);

      console.log(messageContainer);
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
  const textArea: HTMLDivElement = this.document.querySelector(".text-area");
  const userNameInput: HTMLInputElement | null =
    document.querySelector(".username-input");
  const textButton: HTMLButtonElement | null =
    document.querySelector(".text-button");
  if (textButton) {
    textButton.addEventListener("click", async () => {
      const textMessage = textArea.innerHTML.trim();
      console.log(textMessage);
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
    });
  }
  const nameButton: HTMLButtonElement | null =
    document.querySelector(".name-button");
  if (nameButton) {
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
}

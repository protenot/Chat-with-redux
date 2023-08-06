import { getMessagesList, sendMessage } from "./messageAPI";
import { addMessage, showMessages, createUser } from "./action";
import { Message, MessageList } from "./types";
import { store } from "./redux";
export async function loadMessagesList(): Promise<void> {
  try {
    const messages = await getMessagesList();
    store.dispatch(showMessages(messages?.slice(-20) ?? []));
  } catch (error) {
    alert("Error");
  }
}

export function createMessageMarkup(): void {
  const messageContainer: HTMLDivElement =
    this.document.querySelector(".message-container");
  const userNameInput: HTMLInputElement =
    this.document.querySelector(".username-input");
  const { messages, name } = store.getState();
  messageContainer.innerHTML = "";

  messages.forEach((message: Message) => {
    const messageTemplate: any = `
        <div class = 'message-container'>
            <p class = "message-container_name">${message.name}</p>
            <p class = "message-container_text">${message.message}</p>
        </div>
        `;
    messageContainer.insertAdjacentElement("beforeend", messageTemplate);
  });
  messageContainer.scrollTop = messageContainer.scrollHeight;
  userNameInput.value = name;
}
export function startListeners(): void {
  const textArea: HTMLDivElement = this.document.querySelector(".text-area");
  const userNameInput: HTMLInputElement =
    this.document.querySelector(".username-input");

  this.document
    .querySelector(".text-button")
    .addEventListener("click", async () => {
      const textMessage = textArea.innerHTML.trim();
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

  document.querySelector(".name-button")?.addEventListener("click", () => {
    const userName = userNameInput.value.trim();
    if (!userName) {
      return;
    }
    store.dispatch(createUser(userName));
  });
}

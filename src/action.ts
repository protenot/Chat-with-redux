import { Action, Message, MessageList, State } from "./types";

export const addMessage = (message: Message): Action => ({
  type: "ADD_MESSAGE",
  payload: message,
});

export const showMessages = (messages: MessageList): Action => ({
  type: "SHOW_MESSAGES",
  payload: messages,
});

export const createUser = (name: string): Action => ({
  type: "CREATE_USER",
  payload: name,
});
export const deleteMessage = (message: Message): Action => ({
  type: "DELETE_MESSAGE",
  payload: message,
});

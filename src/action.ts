import { Action, Message, MessageList } from "./types";

export const addMessage = (message: string): Action => ({
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

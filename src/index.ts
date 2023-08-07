import { addMessage } from "./action";
import {
  loadMessagesList,
  createMessageMarkup,
  startListeners,
} from "./createChat";
import { observeWithEventSource } from "./messageAPI";
import { store } from "./redux";
import { Message } from "./types";
import "./style.css";
store.subscribe(createMessageMarkup);

loadMessagesList();

startListeners();

startListeners();
observeWithEventSource((data: any) => {
  if (!Object.keys(data).includes("message")) {
    return;
  }
  const message: Message = { ...data, date: new Date(data.date) };

  store.dispatch(addMessage(message));
});

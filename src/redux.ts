import { configureStore } from "@reduxjs/toolkit";
import { State, Action } from "./types";
export function reducer(
  state: State = { name: "", messages: [] },
  action: Action,
): State {
  switch (action.type) {
    case "SHOW_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CREATE_USER":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}

export const store = configureStore({ reducer });

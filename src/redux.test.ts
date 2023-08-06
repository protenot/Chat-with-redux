import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./redux";
import { State, Action } from "./types";

describe("configureStore", () => {
  describe("reducer", () => {
    it("is a function", () => {
      expect(configureStore).toBeInstanceOf(Function);
    });
    it("generates store with reducer", () => {
      const state = 2;
      const store = configureStore({ reducer });
      expect(store.getState).toBeInstanceOf(Function);
      expect(store.dispatch).toBeInstanceOf(Function);
      expect(store.subscribe).toBeInstanceOf(Function);
      expect(store.subscribe(jest.fn())).toBeInstanceOf(Function);
    });
  });
  describe("functional interface", () => {
    it("returns state based on initial state", () => {
      const state = { name: "Bob", messages: [] };
      const action = { type: "2" };

      expect(configureStore({ reducer }).getState()).toEqual({
        messages: [],
        name: "",
      });

      //expect(configureStore({reducer}).getState()).toBe(state);
      expect(reducer(state, action)).toBe(state);
    });

    it("calculates new state with reducer call", () => {
      const state = { name: "Bob", messages: [] };
      const action1 = { type: "xxx" };
      const action2 = { type: "yyyy" };

      reducer(state, action2);
      console.log(reducer(state, action2));
      const store = configureStore({ reducer });
      store.dispatch(action1);
      expect(store.dispatch(action1).type).toBe("xxx");
      expect(reducer(state, action2)).toEqual({ name: "Bob", messages: [] });
      store.dispatch(action2);
      expect(store.dispatch(action2).type).toBe("yyyy");
      reducer(state, action2);
    });
    it("switch cases", () => {
      const state = { name: "Alice", messages: [] };
      const action1 = { type: "SHOW_MESSAGES", payload: "2" };
      expect(reducer(state, action1)).toEqual({
        messages: ["2"],
        name: "Alice",
      });
      const state1 = { name: "Bob", messages: [] };
      const action2 = { type: "ADD_MESSAGE", payload: "5" };
      expect(reducer(state1, action2)).toEqual({
        messages: ["5"],
        name: "Bob",
      });

      const state2 = { name: "", messages: [] };
      const action3 = { type: "CREATE_USER", payload: "Nick" };
      expect(reducer(state2, action3)).toEqual({ messages: [], name: "Nick" });
    });
  });
});

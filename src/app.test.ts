import {
  loadMessagesList,
  createMessageMarkup,
  startListeners,
} from "./createChat";
import { getMessagesList, sendMessage } from "./messageAPI";
import { store } from "./redux";
beforeEach(() => {
  document.body.innerHTML = `
<div class="container">
      <div class="message-container"></div>
      <div class="input-container">
        <div class="user-information">
          <p class="user-name">UserName</p>
          <input
            class="username-input"
            placeholder="Enter your name"
            type="text"
          />
          <button class="name-button">Enter</button>
        </div>
        <div class="text-box">
          <div
            class="text-area"
            
            contenteditable="true"
          ></div>
          <button class="text-button">Send</button>
        </div>
      </div>
    </div>
`;
  store.subscribe(createMessageMarkup);
  global.alert = jest.fn();
});
jest.mock("./messageAPI", () => ({
  __esModule: true,
  getMessagesList: jest.fn(() => [
    { date: new Date(), message: "hello", name: "Bob" },
    { date: new Date(), message: "hi", name: "Peter" },
  ]),
  sendMessage: jest.fn(),
}));
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("functional", () => {
  it("load messages end createMarkup", async () => {
    expect(document.querySelectorAll(".message").length).toBe(0);
    await loadMessagesList();
    expect(getMessagesList).toHaveBeenCalled();
    await sleep(100);
    expect(document.querySelectorAll(".message").length).toBe(2);
  });

  describe("startListeners", () => {
    let input: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(() => {
      startListeners();
    });
    describe("userName", () => {
      beforeEach(() => {
        input = document.querySelector(".username-input") as HTMLInputElement;
        button = document.querySelector(".name-button") as HTMLButtonElement;
      });
      it("changes username", async () => {
        expect(store.getState().name).toBe("");
        input.value = "Alice";
        button.click();
        await sleep(100);
        expect(store.getState().name).toBe("Alice");
        input.value = "";
        button.click();
        expect(alert).toHaveBeenLastCalledWith("Enter username");
      });
    });
    describe("send text", () => {
      it("sends text", async () => {
        const input = document.querySelector(".text-area") as HTMLDivElement;
        const button = document.querySelector(
          ".text-button",
        ) as HTMLButtonElement;
        input.innerHTML = "Message";
        button.click();
        await sleep(100);
        expect(sendMessage).toHaveBeenCalled();
      });
    });
  });
});

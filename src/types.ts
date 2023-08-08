export interface Message {
  message: string;
  name: string;
  date: number | Date;
}

export type MessageList = Message[];

export interface State {
  messages: MessageList;
  name: string;
  date?: Date | number;
}

export interface Action {
  type: string;
  payload?: any;
}

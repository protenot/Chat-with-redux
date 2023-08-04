interface Message {
  message: string;
  name: string;
  data: number | Date;
}

type MessageList = Message[];

interface State {
  messages: MessageList;
  name: string;
}

interface Action {
  type: string;
  payload?: any;
}

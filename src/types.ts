export interface Chat {
  id: number;
  name: string;
  messages: string[];
}

export type Call = {
  callId: string;
  media: string;
  startDate: string;
  service: string;
  caller: string;
};

export type ChatContextProps = {
  username: string;
  calls: Call[];
  currentCall: Call | null;
  isConnected: boolean;
  connect: (username: string, maxCalls: number) => void;
  disconnect: () => void;
  selectCall: (call: Call) => void;
  endCall: (callId: string) => void;
};

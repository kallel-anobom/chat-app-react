import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Call, ChatContextProps } from "../types";
import socket from "../services/socket";

const ChatContext = createContext({} as ChatContextProps);
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>("");
  const [calls, setCalls] = useState<Call[]>([]);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = (username: string, maxCalls: number) => {
    socket.connect();

    socket.emit("USER_CONNECT", { username, maxCalls });
    setUsername(username);
  };

  const disconnect = () => {
    socket.emit("USER_DISCONNECT", { username });
    console.log("Desconectando...");
    socket.disconnect();
  };

  const selectCall = (call: Call) => {
    if (currentCall) {
      socket.emit("END_CALL", { callId: currentCall.callId });
    }
    socket.emit("SELECT_CALL", { callId: call.callId });
    setCurrentCall(call);
  };

  const endCall = (callId: string) => {
    socket.emit("END_CALL", { callId });
    setCurrentCall(null);
  };

  useEffect(() => {
    const handleUserConnected = () => {
      setCalls([]);
      setIsConnected(true);
    };

    const handleNewCall = (call: Call) => {
      if (!call?.callId) {
        console.error("Erro: callId inválido");
        socket.emit("NEW_CALL_ERROR", {
          callId: call?.callId || "unknown",
          error: "callId inválido",
        });
        return;
      }

      setCalls((prevCalls = []) => {
        const alreadyExists = prevCalls.some((c) => c.callId === call.callId);
        if (alreadyExists) return prevCalls;
        return [...prevCalls, call];
      });

      socket.emit("NEW_CALL_ANSWERED", { callId: call.callId });
      console.log("NEW_CALL_ANSWERED enviado para callId:", call.callId);
    };

    const handleCallEnded = (callId: string) => {
      setCalls((prev) => prev.filter((call) => call.callId !== callId));
      if (currentCall?.callId === callId) {
        setCurrentCall(null);
      }
    };

    const handleCallSelected = (call: Call) => {
      setCurrentCall(call);
    };

    socket.on("USER_CONNECTED", handleUserConnected);
    socket.on("NEW_CALL", handleNewCall);
    socket.on("CALL_ENDED", handleCallEnded);
    socket.on("CALL_SELECTED", handleCallSelected);

    return () => {
      socket.off("USER_CONNECTED", handleUserConnected);
      socket.off("NEW_CALL", handleNewCall);
      socket.off("CALL_ENDED", handleCallEnded);
      socket.off("CALL_SELECTED", handleCallSelected);
    };
  }, [currentCall]);

  return (
    <ChatContext.Provider
      value={{
        username,
        calls,
        currentCall,
        isConnected,
        connect,
        disconnect,
        selectCall,
        endCall,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

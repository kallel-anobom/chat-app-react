import React from "react";

import { useChat } from "./context/ChatContext";

import LoginForm from "./pages/LoginForm";
import ChatList from "./pages/ChartList";

const App: React.FC = () => {
  const { isConnected } = useChat();

  return (
    <>
      {!isConnected ? (
        <LoginForm />
      ) : (
        <>
          <ChatList />
        </>
      )}
    </>
  );
};

export default App;

import React from "react";
import { useChat } from "../context/ChatContext";
import ChartDetails from "../components/ChartDetails";
import ChartList from "../components/ChartList";
import Header from "../components/Header";

const ChatList: React.FC = () => {
  const { calls, username, currentCall, selectCall, endCall } = useChat();

  const uniqueCalls = calls.filter(
    (call, index, self) =>
      index === self.findIndex((c) => c.callId === call.callId)
  );

  return (
    <>
      <Header username={username} />
      <div className="h-screen bg-[#F7F7FA] w-full overflow-y-auto p-4">
        <h3 className="mb-4">Conversas em andamento</h3>
        {uniqueCalls.length === 0 ? (
          <p className="font-semibold" style={{ color: "#666" }}>
            Nenhuma conversa no momento
          </p>
        ) : (
          <>
            <div className="flex flex-row p-8">
              <div className="bg-white rounded-xl p-4 w-80 mr-8 shadow-[0 0 10px rgba(0,0,0,0.05)]">
                <h3 className="mb-4 font-bold text-lg">Atendimentos</h3>
                {uniqueCalls.map((call, index) => (
                  <>
                    <ChartList
                      call={call}
                      index={index}
                      currentCall={currentCall}
                      selectCall={selectCall}
                    />
                    <>
                      {currentCall?.callId === call.callId && (
                        <ChartDetails
                          currentCall={currentCall}
                          endCall={endCall}
                        />
                      )}
                    </>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatList;
// grid grid-cols-(repeat(auto-fill, minmax(250px, 1fr))) gap-4

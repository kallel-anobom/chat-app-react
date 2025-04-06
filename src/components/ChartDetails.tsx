import { Call } from "../types";

type CallProps = {
  currentCall: Call | null;
  endCall: (callId: string) => void;
};

const ChartDetails = ({ currentCall, endCall }: CallProps) => {
  return (
    <div
      className="flex flex-col justify-between bg-[#F3F3F5] p-6 rounded-xl border border-[#007bff] shadow-(0 0 10px rgba(0,0,0,0.05))"
      style={{ flex: 1 }}
    >
      {currentCall ? (
        <div>
          <p>
            <strong>Chamada selecionada:</strong>
          </p>
          <p>CallId: {currentCall.callId}</p>
          <p>Mídia: CHAT</p>
          <p>
            Data inicial:{" "}
            {new Date(currentCall.startDate).toLocaleString("pt-BR")}
          </p>
          <p>Serviço: {currentCall?.service}</p>
          <h4>Origem: {currentCall?.caller}</h4>
          <button
            className="mt-2 py-4 px-2  bg-[#dc3545] decoration-white outline-none rounded-sm cursor-pointer"
            onClick={() => currentCall?.callId && endCall(currentCall.callId)}
          >
            Finalizar
          </button>
        </div>
      ) : (
        <p style={{ color: "#666" }}>Selecione uma conversa</p>
      )}
    </div>
  );
};

export default ChartDetails;

import { Call } from "../types";

type CallProps = {
  call: Call;
  index: number;
  selectCall: (call: Call) => void;
  currentCall: Call | null;
};

const ChartList = ({ call, index, currentCall, selectCall }: CallProps) => {
  return (
    <div
      key={index}
      onClick={() => selectCall(call)}
      className="p-4 m-4 rounded-lg bg-[#f9f9f9] shadow-(0 2px 5px rgba(0,0,0,0.1)) cursor-pointer"
      style={{
        transition: "transform 0.2s ease",
        border:
          currentCall?.callId === call.callId
            ? "2px solid #007bff"
            : "1px solid #ccc",
      }}
    >
      <div className="flex flex-col">
        <strong>{call.service}</strong>
        <span className="color-[#777] text-sm">Cliente: {call.caller}</span>
      </div>
      <div className="text-sm color-[#555] font-bold">
        {new Date(call.startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default ChartList;

import { FormEvent, useState } from "react";
import { useChat } from "../context/ChatContext";

const LoginForm: React.FC = () => {
  const { connect, isConnected, disconnect, username } = useChat();

  const [name, setName] = useState("");
  const [maxCalls, setMaxCalls] = useState(1);

  const handleEvent = (e: FormEvent) => {
    e.preventDefault();
    connect(name, maxCalls);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="pb-10">
          <h1>Chat</h1>
          <p>Conecte-se ao chat e comece a conversar!</p>
          <p>
            Para conectar-se, insira seu nome de usuário e o número máximo de
            chats que deseja abrir.
          </p>
        </div>

        {!isConnected ? (
          <form
            className="flex items-center justify-center flex-col"
            onSubmit={handleEvent}
          >
            <input
              className="peer h-10 w-2xs rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 mb-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Usuário"
              required
            />
            <input
              className="peer h-10 w-2xs rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              type="number"
              value={maxCalls}
              min={1}
              onChange={(e) => setMaxCalls(parseInt(e.target.value))}
              placeholder="Máximo de chamadas"
              required
            />
            <button
              className="mt-8 rounded-lg px-8 py-2 text-xl bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
              type="submit"
            >
              Conectar
            </button>
          </form>
        ) : (
          <>
            <p>Conectado como {username}</p>
            <button onClick={disconnect}>Desconectar</button>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;

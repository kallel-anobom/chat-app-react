import { useChat } from "../context/ChatContext";

const Header = ({ username }: { username: string }) => {
  const { disconnect } = useChat();

  const disconnectUser = () => {
    disconnect();
  };

  return (
    <header className="flex items-center justify-between bg-[#173A5E] py-4 px-8 text-white h-">
      <span className="font-bold text-lg">{username}</span>
      <button
        onClick={disconnectUser}
        className="bg-[#E53935] outline-none py-2 px-4 cursor-pointer rounded-md font-bold text-white"
      >
        Desconectar
      </button>
    </header>
  );
};

export default Header;

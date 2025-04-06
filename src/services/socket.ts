import io from "socket.io-client";

const socket = io("http://dev.digitro.com", {
  path: "/callcontrol",
  reconnectionDelayMax: 10000,
});

export default socket;

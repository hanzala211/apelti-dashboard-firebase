import { io } from "socket.io-client"

export const socket = (token: string) => {
  return io(import.meta.env.VITE_SOCKET_URL, {
    extraHeaders: { Authorization: token }
  });
}

export default socket
//@ts-nocheck @ts-ignore
import io from "socket.io-client";
export function getSocket() {
    const socketConnect = io("http://localhost:3001");
    return socketConnect;
}
export const socket = getSocket();

socket.on("connect", () => {
    console.log("Connected to server");
});

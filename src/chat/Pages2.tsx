
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
//@ts-ignore
const socket = io.connect("http://localhost:3001");

function Page2() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
            socket.on("room_joined", (data: any) => {
                console.log(data);
            });
        }

    };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
    socket.on("receive_message", (data: any) => {
        setMessageReceived(data.message);
    });
  useEffect(() => {

  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
          console.log(`my room is ${event.target.value}`);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default Page2;

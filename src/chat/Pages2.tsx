import io from "socket.io-client";
import React, { useEffect, useState } from "react";
//@ts-nocheck
import { socket } from "../listeners/socket"
import "../index.css";

function Page2() {
    //Room State
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState(new Array<string>());

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("chat", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            console.log("Received Message: ", data);
            const message = data.message ? data.message : data
            setMessageReceived(prevMessages => [...prevMessages, message]);
        });
    }, []);

    useEffect(() => {
        if(socket.connected) {
            console.log("Connected to server");
        }
        if(room !== "") {
            joinRoom()
        }
    }, [socket, room]);

    return (
        <div className="App">
            <h1> Message:</h1>
            {messageReceived.map((message, index) => {
                return <p key={index}>{message}</p>;
            })}
            <input
                placeholder="Room Number..."
                onChange={(event) => {
                    setRoom(event.target.value);
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

        </div>
    );
}

export default Page2;

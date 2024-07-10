import io from "socket.io-client";
import React, { useEffect, useState } from "react";
//@ts-nocheck
import { socket } from "../listeners/socket"
import "./index.css";
import { PromptAndResponse } from "../types/PromptAndResponse";
import { useAtom } from "jotai";
import { promptAndMessageHistoryAtom } from "../store/store";

function LandingPage() {
    // Room State
    const [room, setRoom] = useState("");

    // Message States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useAtom(promptAndMessageHistoryAtom);
    console.log("On rerender Message Received: ", messageReceived)

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("chat", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
    };
    const handleMessageReceive = (data: any) => {
        console.log("on message Message Received: ", messageReceived)
        console.log("Received Message: ", data);
        const message = (data && data.message) ? data.message : data;
        setMessageReceived((prevMessages) => [...prevMessages, message]);
    };
    useEffect(() => {
        socket.on("receive_message", handleMessageReceive);
        return () => {
            socket.off("receive_message", handleMessageReceive);
        };
    }, [room, setMessageReceived]);

    useEffect(() => {
        if (socket.connected) {
            console.log("Connected to server");
        }
    }, [socket, room]);

    return (
        <div className="App">
            <h1>Message:</h1>
            <div>
                {messageReceived.map((promptAndResponse, index) => (
                    <div key={index} className="message-container">
                        <p>{promptAndResponse.prompt}</p>
                        <br />
                        <p>{promptAndResponse.response}</p>
                    </div>
                ))}
            </div>
            <input className="input"
                   type="text"
                   placeholder="Room Number..."
                   onChange={(event) => {
                       setRoom(event.target.value);
                   }}
            />
            <button className="buttons"
                    onClick={joinRoom}>Join Room</button>
            <div>
                <input className="input"
                       type="text"
                       placeholder="Message..."
                       onChange={(event) => {
                           setMessage(event.target.value);
                       }}
                       onKeyPress={(event) => {
                           if (event.key === 'Enter') {
                               sendMessage();
                           }
                       }}
                /></div>
            <button className="buttons"
                    onClick={sendMessage}>Send Message</button>
        </div>
    );
}

export default LandingPage;

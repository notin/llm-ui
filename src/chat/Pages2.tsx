import io from "socket.io-client";
import React, { useEffect, useState } from "react";
//@ts-nocheck
import { socket } from "../listeners/socket"
import "./index.css";
import {PromptAndResponse} from "../types/PromptAndResponse";
import {useAtom} from "jotai";
import {messagesAtom} from "../atoms/store";

function Page2() {
    //Room State
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useAtom(messagesAtom);

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("chat", room);
        }
    };


    const sendMessage = () => {
        // joinRoom();
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            const message = data && data.message ? data.message : data;
            setMessageReceived(prevMessages => [...prevMessages, message]);
        });
    }, []);
        return (
            <div className="App">
                <h1>Message:</h1>
                <div>
                    {messageReceived.map((promptAndResponse, index) => (
                        <div key={index} className="message-container">
                            <p>{promptAndResponse.prompt}</p>
                            <br/>
                            <p>{promptAndResponse.response}</p>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Room Number..."
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join Room</button>
                <input
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
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        );

}

export default Page2;

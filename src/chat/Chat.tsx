
import React, { Fragment, useState } from "react";

import "../index.css";
import { useAtom } from "jotai";
import { messagesAtom } from "../atoms/store";
import "../index.css"

const Chat = () => {
    const [chat, setChat] = useAtom(messagesAtom);
    const body = <div key={"chat-body"}>
        {chat.map((message) => {
            let messageDiv = <Fragment></Fragment>;
            let style = message.messageType === "RECEIVED" ? "received-message" : "sent-message";
            messageDiv = <div className={style}>{message.message}</div>;
            return messageDiv;
        }
        )}
    </div>
    return body;
}

export default Chat;
import {atom} from "jotai/vanilla";

export const messagesAtom = atom([
    {user: "ChatGpt", message: "Hello, I'm ChatGpt!", messageType: "RECEIVED"},
    {user: "Me", message: "Hello, I'm Me!", messageType: "SENT"}
]);

export const stompAtom = atom({connected: false});
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Chat from "./chat/Chat";
import Question from "./chat/Question";


import Pages2 from "./chat/Pages2";
import {socket} from "./listeners/socket";



socket.on("connect", () => {
    console.log("Connected to server");
});
const App = () => (
    <div>
        <Pages2/>
    </div>

);
ReactDOM.render(<App/>, document.getElementById("app"));

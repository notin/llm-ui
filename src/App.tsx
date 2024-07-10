import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Chat from "./chat/Chat";
import Question from "./chat/Question";


import LandingPage from "./chat/LandingPage";
import {socket} from "./listeners/socket";




socket.on("connect", () => {
    console.log("Connected to server");
});
const App = () => (
    <div className={"App"}>
        <LandingPage/>
    </div>

);
ReactDOM.render(<App/>, document.getElementById("app"));

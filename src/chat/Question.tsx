import React from 'react';
import {stompAtom} from "../atoms/store";
import {useAtom} from "jotai";
import  {connect, disconnect} from "../listeners/stomp";


const Question = () => {
    const [stomp, setStomp] = useAtom(stompAtom);
    return (<div>
        <label htmlFor="connect">WebSocket connection:</label>
        <button id="connect" className="btn btn-default" type="submit" disabled={stomp.connected} onClick={connect}>Connect</button>
        <button id="disconnect" className="btn btn-default" type="submit" disabled={!stomp.connected} onClick={disconnect}>Disconnect
        </button>
        <div>
            <label htmlFor="question">What is your question?</label>
            <input size={100} type="text" id="question" className="form-control" placeholder="Your question here..."/>
        </div>

    </div>)
}
export default Question;

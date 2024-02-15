import React, { useState } from 'react';
import * as StompJs from '@stomp/stompjs';

const Page = () => {
    const [connected, setConnected] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [question, setQuestion] = useState('');

    const stompClient = new StompJs.Client({
        brokerURL: 'ws://localhost:7071/gs-guide-websocket',
        onConnect: (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/answers', (answer) => {
                showAnswer(JSON.parse(answer.body).answer);
            });
        },
        onWebSocketError: (error) => {
            console.error('Error with websocket', error);
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }
    });

    const connect = () => {
        stompClient.activate();
    };

    const disconnect = () => {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected");
    };

    const sendQuestion = () => {
        const message = "Question: " + question;
        showAnswer(message);
        stompClient.publish({
            destination: "/app/ask",
            body: JSON.stringify({ 'question': question })
        });
    };

    const showAnswer = (message: string) => {
        setAnswers(prevAnswers => [...prevAnswers, message]);
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <button type="button" onClick={connect} disabled={connected}>Connect</button>
                <button type="button" onClick={disconnect} disabled={!connected}>Disconnect</button>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <button type="button" onClick={sendQuestion}>Send Question</button>
            </form>
            {connected && <div id="conversation">
                <table>
                    <tbody>
                    {answers.map((answer, index) => (
                        <tr key={index}><td>{answer}</td></tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
};

export default Page;

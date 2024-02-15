import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
interface StompFrame {
    headers: { [key: string]: string };
    body: string;
}

let stompClient: Client;
let connected = false;
let isInitialized = false;
// Object.assign(global, { WebSocket });
export const initializeStomp = (): void => {
    stompClient = new Client({
        brokerURL: 'ws://localhost:3535'
    });

    stompClient.onConnect = (frame: StompFrame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/answers', (message) => {
            showAnswer(JSON.parse(message.body).answer);
        });
    };

    stompClient.onWebSocketError = (error: Event) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame: StompFrame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };
};

export function connect(): void {
    if (!isInitialized) {
        initializeStomp();
    }
    stompClient.activate();
}

export function disconnect(): void {
    if (!isInitialized) {
        initializeStomp();
    }
    stompClient.deactivate();
    // setConnected(false);
    console.log("Disconnected");
}

export function sendQuestion(question: string): void {
    if (!isInitialized) {
        initializeStomp();
    }
    showAnswer("Question: " + question);
    stompClient.publish({
        destination: "/app/ask",
        body: JSON.stringify({ 'question': question })
    });
}

export function showAnswer(message: string): void {
    if (!isInitialized) {
        initializeStomp();
    }
    const answersElement = document.getElementById('answers');
    if (answersElement) {
        answersElement.innerHTML += `<tr><td>${message}</td></tr>`;
    }
}

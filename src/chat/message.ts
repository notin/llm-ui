export enum MessageType {
    SENT, RECEIVED
}
export interface Message {
    name: string;
    message: string;
    messageType: MessageType;
}
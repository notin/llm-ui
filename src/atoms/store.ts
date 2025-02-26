import {atom} from "jotai/vanilla";
import {PromptAndResponse} from "../types/PromptAndResponse";

export const messagesAtom = atom(new Array<PromptAndResponse>());

export const stompAtom = atom({connected: false});
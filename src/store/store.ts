//create a jotai atom to store the state of the app
// src/atoms.ts
import { atom } from 'jotai';
import {PromptAndResponse} from "../types/PromptAndResponse";

// Define a simple atom to manage a counter state
export const promptAndMessageHistoryAtom = atom(new Array<PromptAndResponse>());

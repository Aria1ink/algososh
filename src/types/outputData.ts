import { ElementStates } from "./element-states";

export type OutputArray<T> = OutputArrayElement<T> [];
export type OutputArrayElement<T> = { value: T; color: ElementStates; };
import React, { useState } from "react";

export function useStack<T> (initValue: T[]): [T[], (element: T) => void, () => void, () => void] {
  const [stack, setStack] = useState<T[]>(initValue);

  const push = (element:T) => {
    setStack((stack) => [...stack, element])
  }
  const pop = () => {
    const tempArray = stack;
    tempArray.pop();
    setStack([...tempArray]);
  }
  const clear = () => {
    setStack([]);
  }
  return [stack, push, pop, clear];
}
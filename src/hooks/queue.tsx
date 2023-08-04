import React, { useState } from "react";

type index = number | null;

export function useQueue (initValue: string[]): [string[], index, index, (element: string) => void, () => void, () => void] {
  const [queue, setQueue] = useState<string[]>(initValue);
  const [head, setHead] = useState<index>(null);
  const [tail, setTail] = useState<index>(null);
  let tempArray: string[];

  const enqueue = (element:string) => {
    if (head === null) {
      tempArray = [element, "", "", "", "", ""];
      setQueue([...tempArray]);
      setHead(0);
      setTail(0);
    } else {
      if (tail !== null && tail < queue.length -1) {
        tempArray = queue;
        tempArray[tail + 1] = element;
        setQueue([...tempArray]);
        setTail(tail + 1);
        tempArray = [];
      } else if (tail === null && head > 0 && head !== queue.length - 1) {
        tempArray = queue;
        tempArray[head] = element;
        setQueue([...tempArray]);
        setTail(head);
      }
    }
  }
  const dequeue = () => {
    if (head !== null && queue[head] !== "" && head < queue.length) {
      tempArray = queue;
      tempArray[head] = "";
      setQueue([...tempArray]);
      if (head === queue.length - 1 || head === tail) {setTail(null)};
      head < queue.length - 1 && setHead(head + 1);
    }
  }
  const clear = () => {
    setQueue(initValue);
    setHead(null);
    setTail(null);
  }
  return [queue, head, tail, enqueue, dequeue, clear];
}
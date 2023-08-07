import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";
import QueueArr from "./queue";

export const QueuePage: React.FC = () => {
  const [queue,] = useState(() => new QueueArr<string>());
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState<"add" | "del" | "clear" |null >(null);
  const [itemHighlight, setitemHighlight] =  useState<number | null>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }
  const onClickAdd = async () => {
    if (inputData && inputData !== "" && head !== outputData.length -1 && tail !== outputData.length -1) {
      setIsStarted("add");
      tail !== null ? setitemHighlight(tail + 1): setitemHighlight(0);
      queue.enqueue(inputData);
      setHead(queue.getHead);
      setTail(queue.getTail);
      setOutputData([...queue.getElements()]);
      setInputData('');
      await sleep(500);
      setitemHighlight(null);
      setIsStarted(null);
    }
  }
  const onClickDel = async () => {
    setIsStarted("del");
    setitemHighlight(head);
    await sleep(500);
    setitemHighlight(null);
    queue.dequeue();
    setHead(queue.getHead);
    setTail(queue.getTail);
    setOutputData([...queue.getElements()]);
    setIsStarted(null);
  }
  const onClickClear = async () => {
    setIsStarted("clear");
    queue.clear();
    setOutputData([...queue.getElements()]);
    setHead(queue.getHead);
    setTail(queue.getTail);
    await sleep(500);
    setIsStarted(null);
  }

  useEffect(() => {
    setOutputData([...queue.getElements()]);
    // Только при монтировании компонента.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.inputContainer}>
        <div className={styles.buttons}>
          <Input maxLength={4} isLimitText={true} value={inputData} onChange={onChangeInput}/>
          <Button 
            text="Добавить" 
            onClick={onClickAdd} 
            disabled={!inputData || inputData === ""} 
            isLoader={isStarted ==="add"}
          />
          <Button 
            text="Удалить" 
            onClick={onClickDel} 
            disabled={head === null || tail === null}
            isLoader={isStarted ==="del"}
          />
        </div>
        <Button text="Очистить" onClick={onClickClear} disabled={head === null} isLoader={isStarted ==="clear"}/>
      </div>
      <div className={styles.container}>
        {outputData && outputData.map((element, index) => {
          return(
            <Circle 
              state={itemHighlight === index ? ElementStates.Changing : ElementStates.Default} 
              letter={element} 
              key={index} 
              index={index}
              head={index === head ? "head" : ""}
              tail={index === tail ? "tail" : ""}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

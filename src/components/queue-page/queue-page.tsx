import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../tools/tools";
import { useQueue } from "../../hooks/queue";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {

  const [queue, head, tail, enqueue, dequeue, clear] = useQueue(["", "", "", "", "", ""]);
  const [inputData, setInputData] = useState<string>('');
  const [itemHighlight, setitemHighlight] =  useState<number | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }
  const onClickAdd = async () => {
    if (inputData && inputData !== "") {
      setIsStarted(true);
      tail !== null ? setitemHighlight(tail + 1): setitemHighlight(0);
      setInputData.length > 0 && enqueue(inputData);
      setInputData('');
      await sleep(500);
      setitemHighlight(null);
      setIsStarted(false);
    }
  }
  const onClickDel = async () => {
    setIsStarted(true);
    setitemHighlight(head);
    await sleep(500);
    setitemHighlight(null);
    dequeue();
    setIsStarted(false);
  }
  const onClickClear = async () => {
    setIsStarted(true);
    clear();
    setIsStarted(false);
  }
  
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input maxLength={4} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button text="Добавить" onClick={onClickAdd} isLoader={isStarted} />
        <Button text="Удалить" onClick={onClickDel} isLoader={isStarted} />
        <Button text="Очистить" onClick={onClickClear} isLoader={isStarted} />
      </div>
      <div className={styles.container}>
        {queue && queue.map((element, index) => {
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

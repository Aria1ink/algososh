import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { OutputArray } from "../../types/outputData";
import { useStack } from "../../hooks/stack";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../tools/tools";

export const StackPage: React.FC = () => {
  const [stack, pushStack, popStack, clearStack] = useStack<string>([]);
  const [inputData, setInputData] = useState<string>('');
  const [itemHighlight, setitemHighlight] =  useState<number | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }
  const onClickAdd = async () => {
    setIsStarted(true);
    setitemHighlight(stack.length);
    setInputData.length > 0 && pushStack(inputData);
    setInputData('');
    await sleep(500);
    setitemHighlight(null);
    setIsStarted(false);
  }
  const onClickDel = async () => {
    setIsStarted(true);
    setitemHighlight(stack.length -1);
    await sleep(500);
    setitemHighlight(null);
    popStack();
    setIsStarted(false);
  }
  const onClickClear = async () => {
    setIsStarted(true);
    clearStack();
    setIsStarted(false);
  }
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input maxLength={4} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button text="Добавить" onClick={onClickAdd} isLoader={isStarted} />
        <Button text="Удалить" onClick={onClickDel} isLoader={isStarted} />
        <Button text="Очистить" onClick={onClickClear} isLoader={isStarted} />
      </div>
      <div className={styles.container}>
        {stack && stack.map((element, index) => {
          return(
            <Circle 
              state={itemHighlight === index ? ElementStates.Changing : ElementStates.Default} 
              letter={element} 
              key={index} 
              index={index}
              head={index === stack.length - 1 ? "top" : ""}
              />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

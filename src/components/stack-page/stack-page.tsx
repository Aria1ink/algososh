import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../tools/tools";
import StackArr from "./stack";

export const StackPage: React.FC = () => {
  const [stack,] = useState(() => new StackArr<string>());
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState<"add" | "del" | "clear" |null >(null);
  const [itemHighlight, setitemHighlight] =  useState<number | null>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }
  const onClickAdd = async () => {
    if (inputData && inputData !== "") {
      setIsStarted("add");
      setitemHighlight(outputData.length);
      stack.push(inputData);
      setOutputData([...stack.getElements()]);
      setInputData('');
      await sleep(500);
      setitemHighlight(null);
      setIsStarted(null);
    }
  }
  const onClickDel = async () => {
    if (outputData.length > 0) {
      setIsStarted("del");
      setitemHighlight(outputData.length -1);
      await sleep(500);
      setitemHighlight(null);
      stack.pop();
      setOutputData([...stack.getElements()]);
      setIsStarted(null);
    }
  }
  const onClickClear = async () => {
    setIsStarted("clear");
    stack.clear();
    setOutputData([]);
    await sleep(500);
    setIsStarted(null);
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.inputContainer}>
      <div className={styles.buttons}>
          <Input maxLength={4} isLimitText={true} value={inputData} onChange={onChangeInput}/>
          <Button text="Добавить" onClick={onClickAdd} disabled={!inputData || inputData === ""} isLoader={isStarted === "add"} />
          <Button text="Удалить" onClick={onClickDel} disabled={outputData.length === 0} isLoader={isStarted === "del"} />
        </div>
        <Button text="Очистить" onClick={onClickClear} disabled={outputData.length === 0} isLoader={isStarted === "clear"} />
      </div>
      <div className={styles.container}>
        {outputData && outputData.map((element, index) => {
          return(
            <Circle 
              state={itemHighlight === index ? ElementStates.Changing : ElementStates.Default} 
              letter={element} 
              key={index} 
              index={index}
              head={index === outputData.length - 1 ? "top" : ""}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

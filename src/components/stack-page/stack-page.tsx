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
  const [itemHighlight, setitemHighlight] =  useState<number | null>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }
  const onClickAdd = async () => {
    if (inputData && inputData !== "") {
      setitemHighlight(outputData.length);
      stack.push(inputData);
      setOutputData([...stack.getElements()]);
      setInputData('');
      await sleep(500);
      setitemHighlight(null);
    }
  }
  const onClickDel = async () => {
    if (outputData.length > 0) {
      setitemHighlight(outputData.length -1);
      await sleep(500);
      setitemHighlight(null);
      stack.pop();
      setOutputData([...stack.getElements()]);
    }
  }
  const onClickClear = async () => {
    stack.clear();
    setOutputData([]);
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input maxLength={4} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button text="Добавить" onClick={onClickAdd} disabled={!inputData || inputData === ""} />
        <Button text="Удалить" onClick={onClickDel} disabled={outputData.length === 0} />
        <Button text="Очистить" onClick={onClickClear} disabled={outputData.length === 0} />
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

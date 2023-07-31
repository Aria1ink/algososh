import React, { ChangeEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./string.module.css";

type OutputArray = {value: string, color: ElementStates}[];

export const StringComponent: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outData, setOutData] =  useState<OutputArray>([]);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }

  const onClickButton = () => {
    const tempArray: OutputArray = [];
    let index: number | undefined;
    if (inputData.length % 2) {
      index = inputData.length / 2 - 0.5
    }

    for (let i = 0; i < inputData.length; i++) {
      tempArray[i] = { 
        value: inputData[i], 
        color: index && i === index ? ElementStates.Default : ElementStates.Changing 
      }
    }
    setOutData(tempArray);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input maxLength={11} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button text="Развернуть" onClick={onClickButton} />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element) => {
          return(
            <Circle state={element.color} letter={element.value} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import type { OutputArray } from "../../types/outputData";
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outData, setOutData] =  useState<OutputArray<string>>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  }

  const onClickButton = async () => {
    setIsStarted(true);
    await reverseString(inputData, setOutData);
    setIsStarted(false);
    setInputData("");
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputContainer}>
        <Input maxLength={11} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button 
          text="Развернуть" 
          onClick={onClickButton} 
          isLoader={isStarted} 
          disabled={!inputData || inputData.length < 1} 
        />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <Circle state={element.color} letter={element.value} key={index} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

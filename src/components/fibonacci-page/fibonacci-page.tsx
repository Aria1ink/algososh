import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../tools/tools";

export const FibonacciPage: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outData, setOutData] =  useState<number[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }

  const onClickButton = async () => {
    setIsStarted(true);
    const resultArray:number[] = [];
    const number = Number(inputData);
    if (!Number.isNaN(number) && number > 0) {
      for (let i = 0; i <= number; i++) {
        if (i < 2) {
          i === 0 ? resultArray.push(0) : resultArray.push(1);
        } else {
          resultArray.push(resultArray[i - 2] + resultArray[i - 1])
        }
        setOutData([...resultArray]);
        await sleep(500);
      }
    }
    setIsStarted(false);
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputContainer}>
        <Input 
          placeholder="Введите число" 
          type="number" 
          max={19} 
          min={1}
          maxLength={19}
          isLimitText={true} 
          value={inputData} 
          onChange={onChangeInput}
        />
        <Button 
          text="Развернуть" 
          onClick={onClickButton} 
          isLoader={isStarted} 
          disabled={!inputData || inputData === "" || Number(inputData) > 19 || Number(inputData) < 1} 
        />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <Circle letter={element.toString()} tail={index.toString()} key={index} />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

import React, { ChangeEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../tools/tools";
import styles from "./string.module.css";

type OutputArray = {value: string, color: ElementStates}[];

export const StringComponent: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outData, setOutData] =  useState<OutputArray>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }

  const onClickButton = async () => {
    setIsStarted(true);
    let tempArray: OutputArray = [];
    let index: number | undefined;
    let secondElement: number;

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
    for (let i = 0; i < inputData.length / 2; i++) {
      secondElement = inputData.length - i -1;
      tempArray[i].color = ElementStates.Modified;
      tempArray[secondElement].color = ElementStates.Modified;
      await sleep(1500);
      setOutData([...tempArray]);
      await sleep(1500);
      tempArray = switchElements(i, secondElement, tempArray);
      setOutData([...tempArray]);
    }
    setIsStarted(false);
    tempArray = [];
  }
  const switchElements = (first: number, second: number, array: OutputArray)=> {
    const tempElementValue = array[first].value;
      array[first].value = array[second].value;
      array[second].value = tempElementValue;
      return array;
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input maxLength={11} isLimitText={true} value={inputData} onChange={onChangeInput}/>
        <Button text="Развернуть" onClick={onClickButton} isLoader={isStarted} />
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

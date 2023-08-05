import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";
import { createRandomArray } from "../../tools/tools";
import DoubleLinkedList from "./list";
import { OutputArray, OutputArrayElement } from "../../types/outputData";

export const ListPage: React.FC = () => {

  const [list, ] = useState(() => new DoubleLinkedList<OutputArrayElement<number>>(createRandomArray(6)))
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [outData, setOutData] =  useState<OutputArray<number>>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value)
  }
  const addToHead = () => {
    list.addToStart({value: Number(inputValue), color: ElementStates.Default});
    updateOutput();
  }
  const addToTail = () => {
    list.addToEnd({value: Number(inputValue), color: ElementStates.Default});
    updateOutput();
  }
  const addByIndex = () => {
    list.addByIndex({value: Number(inputValue), color: ElementStates.Default}, Number(inputIndex));
    updateOutput();
  }
  const delFromHead = () => {
    list.delFromStart();
    updateOutput();
  }
  const delFromTail = () => {
    list.delFromEnd();
    updateOutput();
  }
  const delByIndex = () => {
    list.delByIndex(Number(inputIndex));
    updateOutput();
  }
  const updateOutput = () => {
    const tempArray = list.getAsArray();
    if (tempArray) setOutData([...tempArray]);
  }
  useEffect(() => {
    updateOutput();
  }, []);
  
  return (
    <SolutionLayout title="Связный список">

      <div className={styles.container}>
        <Input placeholder="Введите значение" maxLength={4} isLimitText={true} value={inputValue} onChange={onChangeValue}/>
        <Button text="Добавить в head" onClick={addToHead} />
        <Button text="Добавить в tail" onClick={addToTail}  />
        <Button text="Удалить из head" onClick={delFromHead}  />
        <Button text="Удалить из tail" onClick={delFromTail}  />
      </div>
      <div className={styles.container}>
        <Input placeholder="Введите индекс" value={inputIndex} onChange={onChangeIndex}/>
        <Button text="Добавить по индексу" onClick={addByIndex}  />
        <Button text="Удалить по индексу" onClick={delByIndex}  />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <Circle 
              state={ElementStates.Default} 
              letter={element.value.toString()} 
              key={index} 
              index={index}

              />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

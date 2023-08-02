import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import type { OutputArray } from "../../types/outputData";
import { createRandomArray, sleep } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [outData, setOutData] =  useState<OutputArray<number>>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [firstSelected, setFirstSelected] = useState<number | null>();
  const [secondSelected, setSecondSelected] = useState<number | null>();

  const onClickAscending = async () => {
    setIsStarted(true);
    sortSelect();
    setIsStarted(false);
  }
  const onClickDescending = async () => {
    setIsStarted(true);

    setIsStarted(false);
  }
  const onClickCreateArray = async () => {
    setOutData(createRandomArray());
  }
  const sortSelect = async () => {
    const tempArray = outData;
    let minimalIndex: number;
    let minimalValue: { value: number; color: ElementStates; };
    for (let i = 0; i < tempArray.length; i++) {
      setFirstSelected(i);
      minimalIndex = i;
      await sleep(1000);
      for (let j = i + 1; j < tempArray.length; j++) {
        setSecondSelected(j);
        console.log(minimalIndex)
        minimalIndex = tempArray[minimalIndex] < tempArray[j] ? minimalIndex : j
        console.log(tempArray[minimalIndex])
        await sleep(1000);
      }
      if (minimalIndex = i) {
        tempArray[i].color = ElementStates.Modified;
      } else {
        minimalValue = tempArray[minimalIndex];
        minimalValue.color = ElementStates.Modified;
        tempArray[minimalIndex] = tempArray[i];
        tempArray[i] = minimalValue;
      }
      setOutData(tempArray);
      await sleep(1000);
    }
    setFirstSelected(null);
    setSecondSelected(null);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput label="Выбор" onSelect={() => {setSortingType("select")}} />
        <RadioInput label="Пузырек" onSelect={() => {setSortingType("bubble")}} />
        <div>
          <Button text="По возрастанию" sorting={Direction.Ascending} isLoader={isStarted} onClick={onClickAscending} />
          <Button text="По убыванию" sorting={Direction.Descending} isLoader={isStarted} onClick={onClickDescending} />
        </div>
        <Button text="Новый массив" onClick={onClickCreateArray} isLoader={isStarted} />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <Column 
              index={element.value} 
              state={firstSelected === index || secondSelected === index ? ElementStates.Changing : element.color} 
              key={index} 
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

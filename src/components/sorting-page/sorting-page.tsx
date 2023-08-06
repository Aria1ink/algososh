import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import type { OutputArray } from "../../types/outputData";
import { createRandomArray, sleep, switchArrayElements } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [outData, setOutData] =  useState<OutputArray<string>>([]);
  const [isStarted, setIsStarted] = useState<"Ascending" | "Descending" | null >(null);
  const [firstSelected, setFirstSelected] = useState<number | null>();
  const [secondSelected, setSecondSelected] = useState<number | null>();

  const onClickAscending = async () => {
    setIsStarted("Ascending");
    sortingType === "select" ? await sortSelect(Direction.Ascending) : await sortBubble(Direction.Ascending);
    setIsStarted(null);
  }
  const onClickDescending = async () => {
    setIsStarted("Descending");
    sortingType === "bubble" ? await sortSelect(Direction.Descending) : await sortBubble(Direction.Descending);
    setIsStarted(null);
  }
  const onClickCreateArray = async () => {
    setOutData(createRandomArray());
  }
  const sortSelect = async (type: Direction) => {
    let tempArray = outData;
    let minimalIndex: number;
    for (let i = 0; i < tempArray.length; i++) {
      setFirstSelected(i);
      minimalIndex = i;
      await sleep(1000);
      for (let j = i + 1; j < tempArray.length; j++) {
        setSecondSelected(j);
        if (type === Direction.Ascending) { 
          minimalIndex = tempArray[minimalIndex].value < tempArray[j].value ? minimalIndex : j;
        }
        if (type === Direction.Descending) { 
          minimalIndex = tempArray[minimalIndex].value > tempArray[j].value ? minimalIndex : j;
        }
        await sleep(1000);
      }
      if (minimalIndex === i) {
        tempArray[i].color = ElementStates.Modified;
      } else {
        tempArray = switchArrayElements(i, minimalIndex, tempArray);
        tempArray[i].color = ElementStates.Modified;
      }
      setOutData([...tempArray]);
      await sleep(1000);
    }
    setFirstSelected(null);
    setSecondSelected(null);
  }

  const sortBubble = async (type: Direction) => {
    let tempArray = outData;

    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray.length - 1 - i ; j++) {
        setFirstSelected(j);
        setSecondSelected(j+1)
        if (type === Direction.Ascending) {
          if (tempArray[j].value > tempArray[j+1].value) {
            tempArray = switchArrayElements(j, j+1, tempArray);
          }
        }
        if (type === Direction.Descending) {
          if (tempArray[j].value < tempArray[j+1].value) {
            tempArray = switchArrayElements(j, j+1, tempArray);
          }
        }
        setOutData([...tempArray]);
        await sleep(1000);
      }
      tempArray[tempArray.length - 1 - i].color = ElementStates.Modified;
      setOutData([...tempArray]);
      await sleep(500);
    }
    setFirstSelected(null);
    setSecondSelected(null);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputContainer}>
        <div className={styles.radio}>
          <RadioInput label="Выбор" name="sortType" value="select" onSelect={() => {setSortingType("select")}} />
          <RadioInput label="Пузырек" name="sortType" value="bubble" onSelect={() => {setSortingType("bubble")}} />
        </div>
        <div className={styles.buttons}>
          <Button 
            text="По возрастанию" 
            sorting={Direction.Ascending} 
            isLoader={isStarted === "Ascending"} 
            onClick={onClickAscending} 
            disabled={isStarted === "Descending"}
          />
          <Button 
            text="По убыванию" 
            sorting={Direction.Descending} 
            isLoader={isStarted === "Descending"} 
            onClick={onClickDescending} 
            disabled={isStarted === "Ascending"} 
          />
        </div>
        <Button text="Новый массив" onClick={onClickCreateArray} disabled={isStarted !== null} />
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <Column 
              index={Number(element.value)} 
              state={firstSelected === index || secondSelected === index ? ElementStates.Changing : element.color} 
              key={index} 
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};

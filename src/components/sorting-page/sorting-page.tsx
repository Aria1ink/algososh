import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import type { OutputArray } from "../../types/outputData";
import { createRandomArray } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { sortBubble, sortSelect } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [outData, setOutData] =  useState<OutputArray<string>>([]);
  const [isStarted, setIsStarted] = useState<"Ascending" | "Descending" | null >(null);
  const [firstSelected, setFirstSelected] = useState<number | null>();
  const [secondSelected, setSecondSelected] = useState<number | null>();

  const onClickAscending = async () => {
    setIsStarted("Ascending");
    sortingType === "select" ? await sortSelect(Direction.Ascending, outData, setOutData, setFirstSelected, setSecondSelected) 
      : await sortBubble(Direction.Ascending, outData, setOutData, setFirstSelected, setSecondSelected);
    setIsStarted(null);
  }
  const onClickDescending = async () => {
    setIsStarted("Descending");
    sortingType === "bubble" ? await sortSelect(Direction.Descending, outData, setOutData, setFirstSelected, setSecondSelected) 
      : await sortBubble(Direction.Descending, outData, setOutData, setFirstSelected, setSecondSelected);
    setIsStarted(null);
  }
  const onClickCreateArray = async () => {
    setOutData(createRandomArray());
  }

  useEffect(() => {
    setOutData(createRandomArray());
  }, []);

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

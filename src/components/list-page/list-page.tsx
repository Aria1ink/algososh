import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";
import { createRandomArray, sleep } from "../../tools/tools";
import DoubleLinkedList from "./list";
import { OutputArray, OutputArrayElement } from "../../types/outputData";
import { ArrowIcon } from "../ui/icons/arrow-icon";
type ChangedElement = {
  index: number | null; 
  value: string | null; 
  byIndex: boolean;
}
export const ListPage: React.FC = () => {
  const changedElementDefaultValue: ChangedElement = {index: null, value: null, byIndex: false};
  const [list, ] = useState(() => new DoubleLinkedList<OutputArrayElement<string>>(createRandomArray(6)))
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [outData, setOutData] =  useState<OutputArray<string>>([]);
  const [elementToAdd, setElementToAdd] = useState<ChangedElement>(changedElementDefaultValue);
  const [elementToDel, setElementToDel] = useState<ChangedElement>(changedElementDefaultValue);
  const [elementChanged, setElementChanged] = useState<number | null>(null);
  const [maxIndex, setMaxIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<string | null>(null);

  const delArrayElementValue = (index: number, array: OutputArray<string>) => {
    const tempArray = array;
    tempArray[index].value = "";
    return tempArray;
  }
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value)
  }
  const addToHead = async () => {
    if (inputValue && inputValue !== "") {
      setIsStarted("addHead");
      list.addToStart({value: inputValue, color: ElementStates.Default});
      setElementToAdd({index: 0, value: inputValue, byIndex: false});
      await sleep(500);
      updateOutput();
      setElementChanged(0);
      setElementToAdd(changedElementDefaultValue);
      setInputValue("");
      await sleep(500);
      setElementChanged(null);
      setIsStarted(null);
    }
  }
  const addToTail = async () => {
    if (inputValue && inputValue !== "") {
      setIsStarted("addTail");
      list.addToEnd({value: inputValue, color: ElementStates.Default});
      setElementToAdd({index: outData.length - 1, value: inputValue, byIndex: false});
      await sleep(500);
      updateOutput();
      setElementChanged(outData.length);
      setElementToAdd(changedElementDefaultValue);
      setInputValue("");
      await sleep(500);
      setElementChanged(null);
      setIsStarted(null);
    }
  }
  const addByIndex = async() => {
    if (inputValue && inputValue !== "" && inputIndex && inputIndex !== "") {
      setIsStarted("addByIndex");
      list.addByIndex({value: inputValue, color: ElementStates.Default}, Number(inputIndex));
      for ( let i = 0; i <= Number(inputIndex); i++) {
        setElementToAdd({index: i, value: inputValue, byIndex: true});
        await sleep(500);
      }
      updateOutput();
      setElementChanged(Number(inputIndex));
      setElementToAdd(changedElementDefaultValue);
      setInputValue("");
      setInputIndex("");
      await sleep(500);
      setElementChanged(null);
      setIsStarted(null);
    }
  }
  const delFromHead = async () => {
    setIsStarted("delHead");
    list.delFromStart();
    setElementToDel({index: 0, value: outData[0].value, byIndex: false});
    setOutData([...delArrayElementValue(0, outData)]);
    await sleep(500);
    updateOutput();
    setElementToDel(changedElementDefaultValue);
    await sleep(500);
    setIsStarted(null);
  }
  const delFromTail = async () => {
    setIsStarted("delTail");
    list.delFromEnd();
    setElementToDel({index: outData.length -1, value: outData[outData.length -1].value, byIndex: false});
    setOutData([...delArrayElementValue(outData.length -1, outData)]);
    await sleep(500);
    updateOutput();
    setElementToDel(changedElementDefaultValue);
    setIsStarted(null);
  }
  const delByIndex = async () => {
    if ( inputIndex && inputIndex !== "" && Number(inputIndex) <= maxIndex) {
      setIsStarted("delByIndex");
      list.delByIndex(Number(inputIndex));
      for ( let i = 0; i < Number(inputIndex); i++) {
        setElementToDel({index: i, value: null, byIndex: true});
        await sleep(500);
      }
      setElementToDel({index: Number(inputIndex), value: outData[Number(inputIndex)].value, byIndex: true});
      setOutData([...delArrayElementValue(Number(inputIndex), outData)]);
      setInputIndex("");
      await sleep(500);
      updateOutput();
      setElementToDel(changedElementDefaultValue);
      setIsStarted(null);
    }
  }
  const updateOutput = () => {
    const tempArray = list.getAsArray();
    if (tempArray) {
      setOutData([...tempArray]);
      setMaxIndex(tempArray.length -1);
    }
  }
  useEffect(() => {
    updateOutput();
    // Вызов только при монтировании компонента.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <SolutionLayout title="Связный список">

      <div className={styles.inputContainer}>
        <Input 
          placeholder="Введите значение" 
          maxLength={4} 
          isLimitText={true} 
          value={inputValue} 
          onChange={onChangeValue}
          disabled={isStarted != null}
        />
        <Button 
          text="Добавить в head" 
          linkedList="small"
          onClick={addToHead} 
          disabled={(isStarted !== "addHead" && isStarted !== null) || inputValue === ""}
          isLoader={isStarted === "addHead"}
        />
        <Button 
          text="Добавить в tail" 
          linkedList="small"
          onClick={addToTail} 
          disabled={(isStarted !== "addTail" && isStarted !== null) || inputValue === ""}
          isLoader={isStarted === "addTail"}
        />
        <Button 
          text="Удалить из head" 
          linkedList="small"
          onClick={delFromHead} 
          disabled={isStarted !== "delHead" && isStarted !== null} 
          isLoader={isStarted === "delHead"}
        />
        <Button 
          text="Удалить из tail" 
          linkedList="small"
          onClick={delFromTail} 
          disabled={isStarted !== "delTail" && isStarted !== null}
          isLoader={isStarted === "delTail"}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input 
          placeholder="Введите индекс" 
          value={inputIndex} 
          onChange={onChangeIndex} 
          max={maxIndex} 
          isLimitText={true} 
          type="number"
          disabled={isStarted != null}
        />
        <div className={styles.buttons}>
          <Button 
            text="Добавить по индексу" 
            linkedList="big"
            onClick={addByIndex} 
            disabled={(isStarted !== "addByIndex" && isStarted !== null) || inputValue === "" || inputIndex === ""} 
            isLoader={isStarted === "addByIndex"}
          />
          <Button 
            text="Удалить по индексу" 
            linkedList="big"
            onClick={delByIndex}
            disabled={(isStarted !== "delByIndex" && isStarted !== null) || inputIndex === ""}
            isLoader={isStarted === "delByIndex"}
          />
        </div>
      </div>
      <div className={styles.container}>
        {outData && outData.map((element, index) => {
          return(
            <div className={styles.element} key={index} >
              <Circle 
                state={
                  elementChanged === index ? ElementStates.Modified :
                  elementToAdd.byIndex && elementToAdd.index !== null && elementToAdd.index > index ? 
                  ElementStates.Changing :
                  elementToDel.byIndex && elementToDel.index !== null && elementToDel.index > index ? 
                  ElementStates.Changing : ElementStates.Default
                } 
                letter={element.value.toString()} 
                index={index}
                head={
                  elementToAdd.index === index ? 
                    <Circle letter={elementToAdd.value?.toString()} state={ElementStates.Changing} isSmall={true} /> :
                    index === 0 ? "head" : ""
                }
                tail={
                  elementToDel.index === index && elementToDel.value != null ? 
                  <Circle letter={elementToDel.value?.toString()} state={ElementStates.Changing} isSmall={true} /> :
                  index === outData.length - 1 ? "tail" : ""
                }
                />
                {index < outData.length - 1 && <ArrowIcon />}
              </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};

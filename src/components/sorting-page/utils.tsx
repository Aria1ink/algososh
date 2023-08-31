import { sleep, switchArrayElements } from "../../tools/tools";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { OutputArray } from "../../types/outputData";

export const sortSelect = async (
  type: Direction, 
  outData: OutputArray<string>, 
  setOutData: (outData: OutputArray<string>) => void, 
  setFirstSelected: (number: number | null) => void, 
  setSecondSelected: (number: number| null) => void
  ) => {
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
  return tempArray;
}

export const sortBubble = async (
  type: Direction, 
  outData: OutputArray<string>, 
  setOutData: (outData: OutputArray<string>) => void, 
  setFirstSelected: (number: number | null) => void, 
  setSecondSelected: (number: number| null) => void
  ) => {
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
  return tempArray;
}
import { sleep, switchArrayElements } from "../../tools/tools";
import { ElementStates } from "../../types/element-states";
import { OutputArray } from "../../types/outputData";

export const reverseString = async (inputData: string, setOutData: (outData: OutputArray<string>) => void) => {
  let tempArray: OutputArray<string> = [];
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
    await sleep(1000);
    setOutData([...tempArray]);
    await sleep(1000);
    tempArray = switchArrayElements(i, secondElement, tempArray);
    setOutData([...tempArray]);
  }
  return tempArray;
};
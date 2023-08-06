import { ElementStates } from "../types/element-states";
import { OutputArray } from "../types/outputData";

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function switchArrayElements <T extends string | number> (first: number, second: number, array: OutputArray<T>) {
  const tempElement = array[first];
    array[first] = array[second];
    array[second] = tempElement;
    return array;
}

export function createRandomArray(max: number = 17) {
  const arraySize = randomInteger(3, max);
  const resultArray: OutputArray<string> = [];
  for (let i = 0; i < arraySize; i++) {
    resultArray.push({value: randomInteger(0, 100).toString(), color: ElementStates.Default});
  }
  return resultArray;
}

function randomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}
import { ElementStates } from "../types/element-states";
import { OutputArray } from "../types/outputData";

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function createRandomArray() {
  const arraySize = randomInteger(3, 17);
  const resultArray: OutputArray<number> = [];
  for (let i = 0; i < arraySize; i++) {
    resultArray.push({value: randomInteger(0, 100), color: ElementStates.Default});
  }
  return resultArray;
}

function randomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}
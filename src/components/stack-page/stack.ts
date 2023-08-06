type Stack<T> = {
  push(value: T): void;
  pop(): void;
  clear(): void;
  getElements(): T[];
  getSize(): number;
}

export default class StackArr <T> implements Stack<T> {
  head: number | null;
  array: T[];

  constructor() {
      this.head = null;
      this.array = [];
  }
  push(element: T) {
    this.array.push(element);
    this.head === null ? this.head = 0 : this.head++;
  }
  pop() {
    this.array.pop();
  }
  clear() {
    this.array = [];
  }
  getElements = () => {
    return this.array;
  }
  getSize = () => {
    return this.array.length;
  }
}
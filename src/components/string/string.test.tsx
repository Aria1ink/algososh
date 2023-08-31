import { reverseString } from "./utils";

jest.setTimeout(10000);

describe.each([
  ['с чётным количеством символов', '1234', '4321'],
  ['с нечетным количеством символов', '12345', '54321'],
  ['с одним символом', '1', '1'],
  ['пустую строку', '', ''],
])('Проверка разворота строки', (name, input, expected) => {
  it(name, async () => {
    let output = '';
    const tempArr = await reverseString(input, (fake) => {});
    tempArr.forEach(element => {
      output = output + element.value;
    });
    expect(output).toBe(expected);
  });
});
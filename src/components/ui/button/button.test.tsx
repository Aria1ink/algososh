import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe('Проверка элемента Button', function () {
  it('Без текста', function () {
    const element = renderer
      .create(<Button text=""/>)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С текстом', function () {
    const element = renderer
      .create(<Button text="TEST"/>)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С лоадером', function () {
    const element = renderer
      .create(<Button text="TEST" isLoader={true} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('Отключена', function () {
    const element = renderer
      .create(<Button text="TEST" disabled={true} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('Проверка колбека', function () {
    const testCallback = jest.fn();
    render(<Button text="TEST" onClick={testCallback} />);
    fireEvent.click(screen.getByText('TEST'));
    expect(testCallback).toHaveBeenCalled();
  });
});
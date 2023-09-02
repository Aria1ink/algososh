import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Проверка элемента Circle', function () {
  it('Без буквы', function() {
    const element = renderer
      .create(<Circle letter="" />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С буквами', function() {
    const element = renderer
      .create(<Circle letter="T" />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С head', function() {
    const element = renderer
      .create(<Circle head={'test'} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С react-элементом в head', function() {
    const element = renderer
      .create(<Circle head={<Circle isSmall={true} />} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С tail', function() {
    const element = renderer
      .create(<Circle tail="test" />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С react-элементом в tail', function() {
    const element = renderer
      .create(<Circle tail={<Circle isSmall={true} />} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С index', function() {
    const element = renderer
      .create(<Circle index={0} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('С пропсом isSmall ===  true', function() {
    const element = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('В состоянии default', function() {
    const element = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('В состоянии changing', function() {
    const element = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
  it('В состоянии modified', function() {
    const element = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(element).toMatchSnapshot();
  });
});
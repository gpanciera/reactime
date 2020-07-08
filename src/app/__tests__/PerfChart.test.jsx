import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PerfView from '../components/PerfView.jsx';

// Unit test cases for PerfView
configure({ adapter: new Adapter() });

// Test life cycle methods
describe('Life cycle methods in PerfView', () => {
  let wrapper;

  const snapshots = {
    name: 'App',
    timeData: { actualDuration: 35000 },
    value: 17010,
    children: [
      { name: 'DisplayPanel', timeData: { actualDuration: 35000 }, value: 17010 },
      { name: 'AltDisplay', timeData: { actualDuration: 35000 }, value: 5842 },
      {
        name: 'Button Panel',
        timeData: { actualDuration: 35000 },
        value: 17010,
        children: [
          { name: 'Button', timeData: { actualDuration: 35000 }, value: 50000 },
          { name: 'Button', timeData: { actualDuration: 35000 }, value: 2047 },
          { name: 'Button', timeData: { actualDuration: 35000 }, value: 1375 },
          { name: 'Button', timeData: { actualDuration: 35000 }, value: 8746 },
        ],
      },
      { name: 'MarketSContainer', timeData: { actualDuration: 35000 }, value: 1041 },
      { name: 'MainSlider', timeData: { actualDuration: 35000 }, value: 5176 },
      { name: 'Tree', timeData: { actualDuration: 35000 }, value: 449 },
      { name: 'AnotherTree', timeData: { actualDuration: 35000 }, value: 5593 },
    ],
  };

  // Set up wrapper
  beforeEach(() => {
    wrapper = mount(<Chart {...props} />);
    wrapper = mount(<PerfView viewIndex={viewIndex} snapshots={snapshots} />);
  });
  // test componentDidMount
  it('should call componentDidMount once', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
  });
  // test maked3Tree within componentDidMount
  it('should call maked3Tree upon mounting', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'maked3Tree');
    instance.componentDidMount();
    expect(instance.maked3Tree).toHaveBeenCalledTimes(1);
  });
  // test componentDidUpdate
  it('should call componentDidUpdate once', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentDidUpdate');
    instance.componentDidUpdate();
    expect(instance.componentDidUpdate).toHaveBeenCalledTimes(1);
  });
  // test maked3Tree within componentDidUpdate
  it('should call maked3Tree once upon updating', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'maked3Tree');
    instance.componentDidUpdate();
    expect(instance.maked3Tree).toHaveBeenCalledTimes(1);
  });
});

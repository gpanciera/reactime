import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PerfView from '../components/PerfView.jsx';

// Unit test cases for PerfView
configure({ adapter: new Adapter() });

// Test life cycle methods
describe('Life cycle methods in PerfView', () => {
  let wrapper;

  const snapshot = {
    name: 'root',
    state: 'root',
    componentData: {},
    children:
    [
      {
        name: 'App',
        state: { counter: 10 },
        componentData: { actualDuration: 10000 },
        children:
        [
          { name: 'DisplayPanel', state: 'stateless', componentData: { actualDuration: 5000 }, children: [] },
          { name: 'AltDisplay', state: 'stateless', componentData: { actualDuration: 4000 }, children: [] },
          {
            name: 'Button Panel',
            state: 'stateless',
            componentData: { actualDuration: 3000 },
            children:
            [
              { name: 'Button', state: { counter: 2 }, componentData: { actualDuration: 2000 }, children: [] },
              { name: 'Button', state: { counter: 1 }, componentData: { actualDuration: 1000 }, children: [] },
            ],
          },
          { name: 'MarketSContainer', state: 'stateless', componentData: { actualDuration: 500 }, children: [] },
          { name: 'MainSlider', state: 'stateless', componentData: { actualDuration: 100 }, children: [] },
        ],
      },
    ],
  };
  
  // Set up wrapper
  beforeEach(() => {
    const snapshots = [];
    snapshots.push(snapshot);
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

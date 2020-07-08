import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PerfView from '../components/PerfView.jsx';
// Unit test cases for d3 functionality
configure({ adapter: new Adapter() });
// Test the life cycle methods in Chart
describe('Life cycle methods in Chart', () => {
  let wrapper;
  const props = {
    hierarchy: 0,
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

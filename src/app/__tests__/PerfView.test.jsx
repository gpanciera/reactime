import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PerfView from '../components/PerfView.jsx';
// import { iterator } from 'core-js/fn/symbol';

// Unit test cases for PerfView
configure({ adapter: new Adapter() });

// Test life cycle methods
describe('Life cycle methods in PerfView', () => {
  let snapshots = [];
  // const viewIndex = -1;

  const snapshot = {
    name: 'root',
    state: 'root',
    componentData: {},
    children:
    [
      {
        name: 'App',
        state: { num: 10 },
        componentData: { actualDuration: 10000 },
        children:
        [
          {
            name: 'DisplayPanel', state: 'stateless', componentData: { actualDuration: 5000 }, children: [],
          },
          {
            name: 'AltDisplay', state: 'stateless', componentData: { actualDuration: 4000 }, children: [],
          },
          {
            name: 'Button Panel',
            state: 'stateless',
            componentData: { actualDuration: 3000 },
            children:
            [
              {
                name: 'Button', state: { num: 2 }, componentData: { actualDuration: 2000 }, children: [],
              },
              {
                name: 'Button', state: { num: 1 }, componentData: { actualDuration: 1000 }, children: [],
              },
            ],
          },
          {
            name: 'MarketSContainer', state: 'stateless', componentData: { actualDuration: 500 }, children: [],
          },
          {
            name: 'MainSlider', state: 'stateless', componentData: { actualDuration: 100 }, children: [],
          },
        ],
      },
    ],
  };

  snapshots = [];
  snapshots.push(snapshot);
  snapshots.push(snapshot);

  // Set up ReactWrapper
  it('allows us to set props', () => {
    const wrapper = mount(<PerfView viewIndex={-1} snapshots={snapshots} />);
    expect(wrapper.props().viewIndex).toEqual(-1);
    wrapper.setProps({ viewIndex: 0 });
    expect(wrapper.props().viewIndex).toEqual(0);
  });

  // it('should call useEffect once', () => {
  //   const instance = wrapper.instance();
  //   jest.spyOn(instance, 'useEffect');
  //   instance.useEffect();
  //   expect(instance.useEffect).toHaveBeenCalledTimes(1);
  // });
});


// // test maked3Tree within componentDidMount
// it('should call maked3Tree upon mounting', () => {
//   const instance = wrapper.instance();
//   jest.spyOn(instance, 'maked3Tree');
//   instance.componentDidMount();
//   expect(instance.maked3Tree).toHaveBeenCalledTimes(1);
// });
// // test componentDidUpdate
// it('should call componentDidUpdate once', () => {
//   const instance = wrapper.instance();
//   jest.spyOn(instance, 'componentDidUpdate');
//   instance.componentDidUpdate();
//   expect(instance.componentDidUpdate).toHaveBeenCalledTimes(1);
// });
// // test maked3Tree within componentDidUpdate
// it('should call maked3Tree once upon updating', () => {
//   const instance = wrapper.instance();
//   jest.spyOn(instance, 'maked3Tree');
//   instance.componentDidUpdate();
//   expect(instance.maked3Tree).toHaveBeenCalledTimes(1);
// });


// const props = {
//   viewIndex: -1,
//   snapshots:
//   [
//     {
//       name: 'root',
//       state: 'root',
//       componentData: {},
//       children:
//       [
//         {
//           name: 'App',
//           state: { num: 10 },
//           componentData: { actualDuration: 10000 },
//           children:
//           [
//             {
//               name: 'DisplayPanel', state: 'stateless', componentData: { actualDuration: 5000 }, children: [],
//             },
//             {
//               name: 'AltDisplay', state: 'stateless', componentData: { actualDuration: 4000 }, children: [],
//             },
//             {
//               name: 'Button Panel',
//               state: 'stateless',
//               componentData: { actualDuration: 3000 },
//               children:
//               [
//                 {
//                   name: 'Button', state: { num: 2 }, componentData: { actualDuration: 2000 }, children: [],
//                 },
//                 {
//                   name: 'Button', state: { num: 1 }, componentData: { actualDuration: 1000 }, children: [],
//                 },
//               ],
//             },
//             {
//               name: 'BigBox1', state: 'stateless', componentData: { actualDuration: 500 }, children: [],
//             },
//             {
//               name: 'BigBox2', state: 'stateless', componentData: { actualDuration: 100 }, children: [],
//             },
//           ],
//         },
//       ],
//     }
//   ]
// };

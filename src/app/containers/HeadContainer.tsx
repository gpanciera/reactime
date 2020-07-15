/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import SwitchAppDropdown from '../components/SwitchApp';

function HeadContainer() {
  return (
    <div className="head-container">
      <img src="https://i.imgur.com/19jt84a.png" height="30px" />
      <SwitchAppDropdown />
    </div>
  );
}

export default HeadContainer;

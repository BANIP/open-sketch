//import React from 'react';
import React, { Component } from 'react';
import styles from './index.scss';
  
import LeftSideBarContainer from './LeftSideBarContainer';
import RightSideBarContainer from './RightSideBarContainer';

class PalletComponent extends Component {
  render() {
    return (
      <div className={styles.pallet}>
        <LeftSideBarContainer />
        <RightSideBarContainer/>
      </div>
    )
  }
};

export default PalletComponent;
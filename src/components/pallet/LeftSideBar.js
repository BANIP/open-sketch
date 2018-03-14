import React from 'react';
import PropTypes from 'prop-types';

import SideBar from './source/SideBar';
import SetModeItem from './source/SetModeItem';

const LeftSideBar = ( childCommonProps ) => {
    return (
      <SideBar direction="left">
        <SetModeItem name="pencil" title="pen" {...childCommonProps} />
        <SetModeItem name="circle" title="circle" {...childCommonProps}/>
        <SetModeItem name="window-restore" title="rect" {...childCommonProps}/>
        <SetModeItem name="font" title="text" {...childCommonProps}/>
      </SideBar>
    ) 
};

LeftSideBar.propTypes = {
    activeTitle: PropTypes.string,
    onSetMode: PropTypes.func,
}

export default LeftSideBar;
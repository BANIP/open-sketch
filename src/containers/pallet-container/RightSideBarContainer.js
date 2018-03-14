import React from 'react';
import SideBar from 'components/pallet/source/SideBar';
import ColorToolsContainer from './right-sidebar/ColorToolsContainer';
import AssistantToolsContainer from './right-sidebar/AssistantToolsContainer';
import LayerToolsContainer from './right-sidebar/LayerToolsContainer';
import TextTools from 'components/pallet/right-sidebar/TextTools';
import TransformToolsContainer from './right-sidebar/TransformToolsContainer';


const RightSideBarContainer = ( childCommonProps ) => {
    return (
      <SideBar direction="right" width="10em">
        <ColorToolsContainer />
        <AssistantToolsContainer />
        <LayerToolsContainer />
        <TextTools />
        <TransformToolsContainer />
      </SideBar>
    ) 
};
export default RightSideBarContainer;
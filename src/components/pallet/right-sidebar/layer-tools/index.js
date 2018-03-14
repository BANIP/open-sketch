import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import cn from 'classnames';
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from "react-immutable-proptypes";


import ToolsGroup from 'components/pallet/source/ToolsGroup';
import styles from './LayerTools.scss';
import Canvas from 'components/sketch/Canvas';
import LayerItem from './LayerItem';


export default class LayerTools extends Component {

  render() {
    const { layers } = this.props;
    const { onAddLayer, onRemoveLayer } = this.props;
    const LayerItemsAttr = {
      onToggleVisible: this.props.onToggleVisible,
      onToggleLocked: this.props.onToggleLocked,
      onRenameLayer: this.props.onRenameLayer,
      onSelectLayer: this.props.onSelectLayer,
      selectedLayer: this.props.selectedLayer,
      isChangeName: this.state.isChangeName,
    }
    const { handleClickRename } = this

    const LayerItems = layers.map( (layer,i) => (
        <LayerItem key={ layer.get("id") } 
          { ...LayerItemsAttr }
          canvasProps={layer} />
      )
    ).toArray();

    return (

      <ToolsGroup 
        title="레이어"
        isShow={true}
        contentClassName={styles.layersWrapper} >
        <div className={ styles.layerUtils }>
          <FontAwesome name="plus" onClick={onAddLayer}/>
          <FontAwesome name="minus" onClick={onRemoveLayer} />
          <FontAwesome name="eraser" onClick={handleClickRename} />  
        </div>
        { LayerItems }
      </ToolsGroup>
    )
  }

  state = {
    isChangeName: false
  }

  handleClickRename = () => {
    this.setState({isChangeName:true});
    console.log(this.state)
  }

};


LayerTools.propTypes = {
  layers:PropTypes.object,
  selectedLayer:PropTypes.string,

  onAddLayer:PropTypes.func,
  onSelectLayer:PropTypes.func,
  onRemoveLayer:PropTypes.func,
  onRenameLayer:PropTypes.func,

  onToggleVisible:PropTypes.func,
  onToggleLocked:PropTypes.func,
  onSetBrightness:PropTypes.func,
  onChangeSelected:PropTypes.func,

}

LayerTools.defaultProps = {
  layers: fromJS([{
    id: "123123123",
    brightness: 100,
    isShow: true,
    isLocked: false,
    name:"test",
    figuresData: [],
  }]),
  selectedLayer:"123123123",
  
  onAddLayer:() => console.log("on add layer"),
  onRemoveLayer:() => console.log("on remove layer"),
  onRenameLayer:({name}) => console.log("on rename layer",name),

  onToggleVisible:({layerId}) => console.log("is not binded props"),
  onToggleLocked:({layerId}) => console.log("is not binded props"),
  onSetBrightness:({layerId,brightness}) => console.log("is not binded props"),
  onChangeSelected:({layerId}) => console.log("is not binded props"),
}
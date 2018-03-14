import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import cn from 'classnames';
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from "react-immutable-proptypes";


import ToolsGroup from 'components/pallet/source/ToolsGroup';
import styles from './LayerTools.scss';
import Canvas from 'components/sketch/Canvas';

class LayerItem extends Component{
  render(){
    const { 
      onToggleVisible, onToggleLocked, selectedLayer, onSelectLayer,
      isChangeName, onBlurRename
    } = this.props;
    let { canvasProps } = this.props;

    const { name, id, isShow, isLocked } = canvasProps.toJS();
    const isActive = this.isActive();
    canvasProps = canvasProps.merge({brightness: 1, isShow: true,});

    return (
      <div 
        className={ cn(styles.layerItem,{[styles.active]:isActive}) }
        onClick={ () => onSelectLayer({id}) } >
          <ItemElement.Preview canvasProps={ canvasProps } />
          <ItemElement.Name 
            name={ name } 
            id={ id } 
            isChangeName={ isChangeName } 
            isActive={ isActive }
            onBlurRename={ onBlurRename } />
          <ItemElement.IconGroup 
            onToggleVisible={onToggleVisible} 
            onToggleLocked={onToggleLocked}
            isShow={isShow}
            isLocked={isLocked}
            id={id} />
      </div>);
  }

  isActive = () => {
    const { selectedLayer, canvasProps } = this.props;

    return selectedLayer === canvasProps.toJS().id;
  }
}

class NameElement extends Component {
  render(){
    const { name, isChangeName, isActive, onBlurRename } = this.props;
    const isRename = isChangeName && isActive;
    const { handleKeyPress } = this

    return (<div className={styles.name}> 
      { isRename? 
          <input ref="input" value={ name } 
            onBlur={ onBlurRename }
            onKeyPress={ handleKeyPress }/>:
          name } 
    </div>)
  }

  state = {
    renameValue : ""
  }

  handleKeyPress = (ev) => {
    console.log(ev.target.value)
    this.setState({renameValue:ev.target.value})
  }
  
  componentWillReceiveProps({ isChangeName, isActive, name }){
    this.setState({renameValue: name})
  }

  componentDidUpdate(){
    if(this.refs.input)
      this.refs.input.focus()
  }
}

const ItemElement = {
  Preview: ({canvasProps}) => (
    <div className={styles.image}> 
      <Canvas layers={ fromJS([ canvasProps.toObject() ]) } />
    </div>
  ),
  Name: NameElement,
  IconGroup: ({onToggleVisible, onToggleLocked, isShow, isLocked, id}) => {
    const hideName = isShow ? "eye" : "eye-slash";
    const lockedName = isLocked ? "lock" : "unlock";

    return (
      <div className={styles.iconGroup}>
          <FontAwesome name={hideName} title="숨김"
            onClick={ () => onToggleVisible({ id }) }
            className={ cn({[styles.active]:isShow, [styles.iconHide]:true, [styles.icon]:true }) } />
          <FontAwesome className={styles.iconLock} name={lockedName} title="잠금"
            onClick={ () => onToggleLocked({ id }) }
            className={ cn({[styles.active]:isLocked, [styles.iconHide]:true, [styles.icon]:true }) } /> 
      </div>
    )
  }
}

  export default LayerItem;
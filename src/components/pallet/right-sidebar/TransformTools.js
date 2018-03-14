import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes'

import { ToolItem } from './sources';
import ToolsGroup from 'components/pallet/source/ToolsGroup';
// import styles from './TransformTools.scss';

const TransformItem = ({ itemKey, value, name, onChange, isNumber = true }) => {
  const handleChange = ({target}) => {
    const { value } = target
    return onChange( itemKey, isNumber ? window.parseInt(value) : value )
  }

  return (
    <ToolItem
      label={name}>
        <input 
          value={value} 
          onChange={handleChange} 
          type="number" />
    </ToolItem>
  )
}        

export default class TransformTools extends Component {
  static propTypes = {
    figureData:ImmutablePropTypes.map,
    onChangeFigureData:PropTypes.func
  }

  static defaultProps = {
    figureData:fromJS({
      id:"123456", type:"circle",
      x:10, y:10, r:10,
      strokeWidth:"#000", strokeStyle:"#000", fillStyle:"#000"
    }),
    onChangeFigureData: (figureData) => console.log(`data updated`,figureData.toJS()),
  }

  handleValueChange = (key,value) => {
    value = value || 0;
    const { onChangeFigureData, figureData } = this.props;
    const updatedFigureData = Map({[key]: value});
    return onChangeFigureData({ transform: updatedFigureData });
  }

  getToolItems = () => {
    const ignoredKeys = ["id","type","strokeWidth","strokeStyle","fillStyle","d","startAxis"];
    const translateKeys = {x:"X좌표",y:"Y좌표",width:"폭",height:"높이"}
    const { handleValueChange } = this;
    const { figureData } = this.props; 

    return figureData.map((value,key) => {
      if(ignoredKeys.indexOf(key) !== -1) return null;
      return (
        <TransformItem
          key={key}
          itemKey={key}
          name={translateKeys[key] || key}
          value={value}
          onChange={handleValueChange} />
      )
    }).valueSeq().toArray()
  }

  render() { 
    const { figureData } = this.props;
    const isShow = figureData !== null;
    const toolItems = this.getToolItems();

    return (
      <ToolsGroup 
        title="변형"
        isShow={isShow}>
        { toolItems }
      </ToolsGroup>
    )
  }
};

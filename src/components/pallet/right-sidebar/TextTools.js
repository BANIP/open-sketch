import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ToolsGroup from 'components/pallet/source/ToolsGroup';
// import styles from './TextTools.scss';


export default class TextTools extends Component {
  static propTypes = {
    isSelectedTextTools: PropTypes.bool,
    figureData: ImmutablePropTypes.map,
    onChangeTextSize: PropTypes.func, 
    onChangeTextColor: PropTypes.func,
    onChangeText: PropTypes.func,
    textSize: PropTypes.number,
    textColor: PropTypes.string,
    text: PropTypes.string,

  }

  static defaultProps = {
    isSelectedTextTools: true,
    figureData: null,
    onChangeTextSize: () => console.log("please define prop to conduct duty"),
    onChangeTextColor: () => console.log("please define prop to conduct duty"),
    onChangeText: () => console.log("please define prop to conduct duty"),
    textSize:10,
    textColor:"#000",
    text:"",
  }

  render() {
    const {isSelectedTextTools, figureData} = this.props;
    const isShow = figureData !== null || isSelectedTextTools;

    return (
      <ToolsGroup 
        title="텍스트"
        isShow={isShow}>
        
      </ToolsGroup>
    )
  }
};

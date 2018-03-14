import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import PropTypes from 'prop-types';
import ImmutablePropTypes from "react-immutable-proptypes";
import Figure from "./Figure";
import styles from "./Canvas.scss";
import cn from "classnames";

class Canvas extends Component {
  static propTypes = {
    className: PropTypes.string,
    isTransparent: PropTypes.bool,
    layers:ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        name: PropTypes.string,
        brightness: PropTypes.number,
        isShow: PropTypes.bool,
        figureData: ImmutablePropTypes.map
      })
    ),
    transform: PropTypes.objectOf({
      scaleX: PropTypes.number,
      scaleY: PropTypes.number,
      offsetX: PropTypes.number,
      offsetY: PropTypes.number,
    })
  }

  render() {
    const { layers, transform, className, isTransparent } = this.props;
    const [ width, height] = [window.innerWidth, window.innerHeight];
   
    const canvasLayers = layers.map(layer => {
      const {id, brightness, isShow, figuresData, name} = layer.toObject();
      return (
          <CanvasLayer 
            key={id}
            id={id} 
            name={name}
            opacity={brightness} 
            visible={isShow} 
            figuresData={figuresData}
            {...transform} />
      )
    });
    return (
      <Stage width={ width } height={ height }
        className={cn(
          styles.canvasWrap,
          className,
          { [styles.transparent] : isTransparent }
        )}>
        { canvasLayers }
      </Stage>
    )
  }
};

class CanvasLayer extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    opacity: PropTypes.number,
    visible: PropTypes.bool,
    figuresData: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        type: PropTypes.oneOf(['pen']),
        d: ImmutablePropTypes.list,
        x: PropTypes.number,
        y: PropTypes.number,
        strokeWidth: PropTypes.number,
        strokeStyle: PropTypes.string,
      }),
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        type: PropTypes.oneOf(['circle']),
        x: PropTypes.number,
        y: PropTypes.number,
        r: PropTypes.number,
        strokeWidth: PropTypes.number,
        strokeStyle: PropTypes.string,
        fillStyle: PropTypes.string,
      }),
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        type: PropTypes.oneOf(['rect']),
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        strokeWidth: PropTypes.number,
        strokeStyle: PropTypes.string,
        fillStyle: PropTypes.string,
      }),
      ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        type: PropTypes.oneOf(['text']),
        x: PropTypes.number,
        y: PropTypes.number,
        text: PropTypes.number,
        fontSize: PropTypes.number,
        strokeStyle: PropTypes.string,
        fillStyle: PropTypes.string,
      }),
    )
  }

  render() {
    const { figuresData, ...props } = this.props;
    const figures = figuresData.map(figureData => {
      const type = figureData.get("type");
      if( !Figure.hasOwnProperty(type) ) return null;
  
      const getComponent = Figure[type].getComponent;
      return getComponent(figureData);
    });
    return (
      <Layer { ...props }>
        { figures }
      </Layer>
    )
  }
};

export default Canvas;

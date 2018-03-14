import React from 'react';
import arrayToSvgpath from "utils/array-to-svgpath";
import { Rect, Text, Path, Circle, Ellipse } from 'react-konva';

export default {
    pen:{
      getComponent:(figureData) => {
        const { x, y, d, id,
          strokeWidth, strokeStyle } = figureData.toJS();
        return (
          <Path key={id}
            data={arrayToSvgpath(d)} x={x} y={y}
            stroke={strokeStyle} strokeWidth={strokeWidth} />
        )
      }
    },
    circle:{
      getComponent:(figureData) => {
        const { x, y, width, height, id,
          strokeWidth, strokeStyle, fillStyle } = figureData.toJS();

        return (
          <Ellipse key={id}
            x={x} y={y} width={width} height={height}
            stroke={strokeStyle} fill={fillStyle}
            strokeWidth={strokeWidth} />
        )
      }
    },
    rect:{
      getComponent:(figureData) => {
        const { width, height, x, y, id,
           strokeWidth, strokeStyle, fillStyle } = figureData.toJS();
        return (
          <Rect key={id}
            x={x} y={y} width={width} height={height}
            stroke={strokeStyle} fill={fillStyle}
            strokeWidth={strokeWidth} />
        )
      }
    },
    text:{
      getComponent:(figureData) => {
        const { x, y, text, id,
          strokeWidth, strokeStyle, fillStyle } = figureData.toJS();
        return (
          <Text key={id}
            x={x} y={y} text={text}
            stroke={strokeStyle} fillStyle={fillStyle} 
            strokeWidth={strokeWidth} />
        )
      }
    }
}
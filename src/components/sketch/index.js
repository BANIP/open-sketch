import React, {Component} from 'react';
import { PropTypes } from "prop-types";
import Canvas from './Canvas';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Sketch extends Component {

    render() { 
      const { layers, cacheLayer } = this.props;
      const transform = this.props.transform.toJS();
      
      const transformProps = {
        scaleX: transform.scale,
        scaleY: transform.scale,
        offsetX: transform.offsetX,
        offsetY: transform.offsetY,
      }

      
      return (
              <div>
                <Canvas layers={ layers } transform={transformProps} /> 
                <Canvas layers={ cacheLayer } isTransparent={true} transform={transformProps} />
              </div>
      );
    }
}

Sketch.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  transform: ImmutablePropTypes.map.require,
  layers: PropTypes.object,
  cacheLayer: PropTypes.object,
}

Sketch.defaultProps = {
  transform: Map({scale:1, offsetX:0, offsetY:0})
}

export default Sketch;
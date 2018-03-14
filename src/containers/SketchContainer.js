//import React from 'react';
import {connect} from 'react-redux';
import Sketch from 'components/sketch'
import { bindActionCreators } from 'redux'


export default connect((state) => ({
    width: window.innerWidth,
    height: window.innerHeight,
    layers: state.canvas.get("layer"),
    cacheLayer: state.canvas.get("cacheLayer"),
    transform: state.canvas.getIn(["stage","transform"]),

  }), (dispatch) => ({

  })
)(Sketch);
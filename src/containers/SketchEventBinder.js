//import React from 'react';
import {connect} from 'react-redux';
import EventBinder from 'components/sketch-event'
import { bindActionCreators } from 'redux'
import { drawStart, drawMove, drawEnd } from 'modules/canvas';
import { zoomIn, zoomOut, setColorPicker } from 'modules/canvas/stage';
import { setKeyStatus } from 'modules/canvas';

export default connect((state) => ({

  }), (dispatch) => ({
    drawStart: bindActionCreators(drawStart, dispatch),
    drawMove: bindActionCreators(drawMove, dispatch),
    drawEnd: bindActionCreators(drawEnd, dispatch),

    zoomIn: bindActionCreators(zoomIn, dispatch),
    zoomOut: bindActionCreators(zoomOut, dispatch),

    setKeyStatus: bindActionCreators(setKeyStatus, dispatch),

    setColorPicker: bindActionCreators(setColorPicker, dispatch),
  })
)(EventBinder);
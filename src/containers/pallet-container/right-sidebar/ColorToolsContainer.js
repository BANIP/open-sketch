import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ColorTools from 'components/pallet/right-sidebar/ColorTools';
import { setFillStyle, setStrokeStyle, setStrokeWidth } from 'modules/canvas/context';
import { setColorPicker } from 'modules/canvas/stage';

const bindCanvasState = (state,stateKey) => state.canvas.getIn(["context",...stateKey]);
const bindStageState = (state,stateKey) => state.canvas.getIn(["stage",...stateKey]);

export default connect(
    (state) => ({
        strokeStyle: bindCanvasState(state,["strokeStyle"]),
        fillStyle: bindCanvasState(state,["fillStyle"]),
        strokeWidth: bindCanvasState(state,["strokeWidth"]),
        activeColorPicker: bindStageState(state,["activeColorPicker"]),
        figureData: null
    }),
    (dispatch) => ({
        onChangeStrokeStyle: bindActionCreators(setStrokeStyle,dispatch),
        onChangeFillStyle: bindActionCreators(setFillStyle,dispatch),
        onChangeStrokeWidth: bindActionCreators(setStrokeWidth,dispatch),
        onSetColorPicker: bindActionCreators(setColorPicker,dispatch),
        onChangeFigureData: () => console.log("미구현"),
    })
)(ColorTools);

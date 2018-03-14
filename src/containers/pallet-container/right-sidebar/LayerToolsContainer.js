import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LayerTools from 'components/pallet/right-sidebar/layer-tools';
import { toggleShow, toggleLocked, setBrightness } from 'modules/canvas/layer';
import { addLayer, selectLayer, removeLayer, renameLayer } from 'modules/canvas/layer';

export default connect(
    (state) => ({
        layers: state.canvas.get("layer"),
        selectedLayer:state.canvas.getIn(["context","selected","layer"]),
    }),
    (dispatch) => ({
        onToggleVisible:bindActionCreators(toggleShow,dispatch),
        onToggleLocked:bindActionCreators(toggleLocked,dispatch),
        onSetBrightness:bindActionCreators(setBrightness,dispatch),

        onAddLayer:bindActionCreators(addLayer,dispatch),
        onSelectLayer:bindActionCreators(selectLayer,dispatch),
        onRemoveLayer:bindActionCreators(removeLayer,dispatch),
        onRenameLayer:bindActionCreators(renameLayer,dispatch),
    })
)(LayerTools);
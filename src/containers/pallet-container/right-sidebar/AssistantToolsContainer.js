import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import AssistantTools from 'components/pallet/right-sidebar/AssistantTools';
import { setKeyStatus } from 'modules/canvas/context';


export default connect(
    (state) => ({
        isDown:state.canvas.getIn(["context","subKey"]).toJS(),
        keyLabel:Map({alt: "직선", ctrl: "곡선"}),

    }),
    (dispatch) => ({
        setKeyStatus: bindActionCreators(setKeyStatus, dispatch),
    })
)(AssistantTools);

import {connect} from 'react-redux';
import LeftSideBar from 'components/pallet/LeftSideBar';
import { bindActionCreators } from 'redux';
import { setMode } from 'modules/canvas';


export default connect((state) => ({
    activeTitle: state.canvas.getIn(["context","selected","mode"]),
  }), (dispatch) => ({
    onSetMode: bindActionCreators(setMode, dispatch),
  })
)(LeftSideBar);
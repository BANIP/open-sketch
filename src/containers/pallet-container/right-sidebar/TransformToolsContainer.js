import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransformTools from 'components/pallet/right-sidebar/TransformTools';
import { Map } from 'immutable';
import { updateFigureData, updateFigure } from 'modules/canvas/workStack';

export default connect(
    ( state ) => ({
        figureData: (() => {
            const { canvas } = state;
            const { figure, layer } = canvas.getIn(["context","selected"]).toJS();
            if( figure === null || layer === null ) return Map({});
            
            let figureData;
            updateFigureData({ state: canvas, id: figure, layerId: layer}, (data) => {
                figureData = data;
            });

            return figureData;
        })()
    }),
    (dispatch) => ({
        onChangeFigureData:bindActionCreators(updateFigure,dispatch)
    })
)(TransformTools);
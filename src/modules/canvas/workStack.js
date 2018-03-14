import { createAction } from "redux-actions";
import shortId from 'shortid';
import { Map } from 'immutable';
import { getSelected } from './context';

const [ 
    UPDATEFIGURE, ADDSTACK, ROLLBACK,
] = [
    "canvas/workStack/updateFigure", "canvas/workStack/addStack",  "canvas/workStack/rollback", 
];

export const [
    updateFigure,
    addStack,
    rollback
] = [
    createAction(UPDATEFIGURE),
    createAction(ADDSTACK),
    createAction(ROLLBACK)
]

const updateWorkStack = ( state , callback ) => {
    return state.updateIn(["workStack"], callback);
};

// layerid와 id값에 해당하는 figureData의 immutable 형태로 업데이트
// callback의 인수는 figureData, {layerIndex, figureIndex} 형태로 구성됨
export const updateFigureData = ({state, layerId, id}, callback) => {
    let layerIndex, figureIndex;
    state.update("layer",layers => {
        layerIndex = layers.findIndex(layer => layer.id === layerId);
        layers.updateIn([layerIndex, "figuresData"],(figuresData) => {
            figureIndex = layers.findIndex(layer => layer.id === layerId);
        })
    })

    return state.updateIn(
        ["layer",layerIndex,"figuresData",figureIndex], 
        (figureData) => callback(figureData,{layerIndex, figureIndex}));
}

export default {
    [updateFigure]: ( state , { payload } ) => {
        const { transform } = payload;
        const { figure:id, layer: layerId } = getSelected(state).toJS();
        return updateFigureData({state, layerId, id}, (figureData) => figureData.merge(transform));
    },
    [addStack]: ( state , { payload } ) => {
        const { layerId, id } = payload;

        const stackItem = Map({layerId, id});
        return updateWorkStack(state, (stack) => stack.push( stackItem ));
    },
    [rollback]: ( state , { payload } ) => {
        let id, layerId, layerIndex, figureIndex;

        updateWorkStack(state, (stack) => {
            const thisStack = stack.get(-1).toJS();
            id = thisStack.Id; layerId = thisStack.layerId;
        });

        updateFigureData({state, id, layerId}, (figureData, metaInfo) => {
            layerIndex = metaInfo.layerIndex;
            figureIndex = metaInfo.figureIndex;
        });

        return updateWorkStack(state, (stack) => stack.remove( -1 ))
            .removeIn(["layer",layerIndex,"figuresData",figureIndex]);
    },

}
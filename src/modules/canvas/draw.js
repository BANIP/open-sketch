import { createAction } from "redux-actions";
import shortId from 'shortid';

import * as ManageFigure from './manage-figure';

const [ 
    DRAWSTART, DRAWMOVE, DRAWEND,
] = [
    "canvas/draw/DRAWSTART", "canvas/draw/DRAWMOVE",  "canvas/draw/DRAWEND", 
];

export const [
    drawStart,
    drawMove,
    drawEnd
] = [
    createAction(DRAWSTART),
    createAction(DRAWMOVE),
    createAction(DRAWEND)
]


const updateFiguresData = ( state , callback, context = null ) => {
    return state.updateIn(["cacheLayer",0,"figuresData"], callback);
};

const insertFigureData = ( state , cacheFigureData, context = null ) => {
    const defaultLayerId = state.getIn("layer",0,"id");
    //console.log(state.getIn("context","selected").toJs)
    const layerId = state.getIn(["context","selected","layer"]) || defaultLayerId;
    const layerIndex = state.get("layer").findIndex(
        (layerData) => layerData.get("id") === layerId
    )

    return state.updateIn(
        ["layer",layerIndex,"figuresData"], 
        (figuresData) => figuresData.push(cacheFigureData)
    );
};

// @center의 위치를 innerWidth/Height에 비례하는 값을 반환
const getAxisPercentage = ({x,y}) => ({
    x:x / window.innerWidth,
    y:y / window.innerHeight
});

// 화면상의 위치를 캔버스상의 위치로 변환
const getAbsoluteAxis = (transform, center) => {
    const { innerWidth, innerHeight } = window;
    const { x: offsetPercentX, y: offsetPercentY } = getAxisPercentage( center );
    const { scale, offsetX: stageOffsetX, offsetY: stageOffsetY } = transform.toJS();
    return {
        x: stageOffsetX + innerWidth * offsetPercentX / scale, 
        y: stageOffsetY + innerHeight * offsetPercentY / scale
    }
}


export default {
    [drawStart]: ( state , { payload } ) => {
        const context = state.get("context");
        const { center } = payload.ev;
        const axis = getAbsoluteAxis(state.getIn(["stage","transform"]) , center);
        const figureID = shortId.generate();

        return updateFiguresData(state, (figuresData) => {
            const mode = context.getIn(["selected","mode"]);
            const getFigure = ManageFigure[mode].start;
            const defaultData = getFigure({context, axis, figureID});
            return figuresData.push( defaultData );
        }).setIn(["context","selected","figure"],figureID);
    },
    [drawMove]: ( state ,{ payload }) => {
        const context = state.get("context");
        const { center } = payload.ev;
        const axis = getAbsoluteAxis(state.getIn(["stage","transform"]) , center);
      
        return updateFiguresData(state, figuresData => {
            const mode = context.getIn(["selected","mode"]);
            const figureId = context.getIn(["selected","figure"]);
            const figureIndex = figuresData.findIndex((figureData) => 
                figureData.get("id") === figureId
            );
            return figuresData.update(figureIndex, (figureData) => {
                const updateFigure = ManageFigure[mode].move;
                return updateFigure(figureData,axis,context);
            });
        })
    },
    [drawEnd]: (state,{payload}) => {

        const cacheFigureData = state.getIn(["cacheLayer",0,"figuresData",0]);
        return insertFigureData(state, cacheFigureData)
            //캐시레이어 초기화
            .deleteIn(["cacheLayer",0,"figuresData",0])
    },
}
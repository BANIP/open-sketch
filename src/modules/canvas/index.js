
import { createLayerData } from './layer';

import { handleActions } from "redux-actions";
import { fromJS } from "immutable";

import contextReducerMap from './context';
import layerReducerMap from './layer';
import drawReducerMap from './draw';
import stageReducerMap from './stage';
import workStackReducerMap from './workStack';

export * from './context';
export * from './layer';
export * from './draw';
export * from './stage';


let initialState = fromJS({
    context:{
        selected:{
            figure: null,
            layer: null,
            mode: "pen",
        },
        subKey:{
            shift: false,
            ctrl: false,
            alt: false,
        },
        fillStyle: `hsla(${Math.random() * 255},100%,50%,0.2)`,
        strokeStyle: "#000",
        strokeWidth: 3,
        transform:{
            scale:1,
            offsetX:0,
            offsetY:0
        }
    },
    layer:[ 
        createLayerData("배경",true),
    ],
    cacheLayer:[ 
        createLayerData("캐시"),
    ],
    stage:{
        transform:{
            scale:1,
            offsetX:0,
            offsetY:0
        },
        activeColorPicker: null,
    },
    workStack:[],
})

// 초기 state 세부사항 변경
initialState = (() => {
    const layerId = initialState.getIn(["layer",0,"id"]);

    return initialState.setIn(["context","selected","layer"], layerId);
})()


// 리듀서 추가
const reducers = handleActions({
    ...contextReducerMap,
    ...drawReducerMap,
    ...layerReducerMap,
    ...stageReducerMap,
    ...workStackReducerMap,
},initialState)

export default reducers;

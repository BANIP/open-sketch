import { createAction } from "redux-actions";
import { bindSimpleAction } from './util';

const [ 
    SET_MODE,
    SET_FILLSTYLE, 
    SET_STROKESTYLE, 
    SET_STROKEWIDTH,
] = [
    "canvas/context/CHANGE_MODE",
    "canvas/context/SET_FILLSTYLE", 
    "canvas/context/SET_STROKESTYLE", 
    "canvas/context/SET_STROKEWIDTH", 
];

export const [
    setMode,
    setFillStyle,
    setStrokeStyle,
    setStrokeWidth,
] = [
    createAction(SET_MODE),
    createAction(SET_FILLSTYLE),
    createAction(SET_STROKESTYLE),
    createAction(SET_STROKEWIDTH)
]

const [ 
    SET_KEYSTATUS,
] = [
    "canvas/context/SET_KEYSTATUS",
];


export const [
    setKeyStatus,
] = [
    createAction(SET_KEYSTATUS),
]


const setContext = bindSimpleAction(["context"]);
export const getSelected = (state) => state.getIn(["context","selected"]);

export default {
    [setMode]: setContext(["selected","mode"]),
    [setFillStyle]: setContext(["fillStyle"]),
    [setStrokeStyle]: setContext(["strokeStyle"]),
    [setStrokeWidth]: setContext(["strokeWidth"]),
    [setKeyStatus]: setContext(["subKey"],(subKey,payload) => {
        /*
            @param {alt, ctrl, shify} key 조작할 키를 설정 
            @param {bool, null} status 키의 상태를 지정, null은 toggle
        */
        const { key, status } = payload;
        if(status === null) return subKey.update(key,thisKey => !thisKey);
        return subKey.set(key,status);
    }),
}
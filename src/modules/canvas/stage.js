import { createAction } from "redux-actions";
import { bindSimpleAction } from './util';

const [ 
    ZOOM_IN,
    ZOOM_OUT,
    MOVE_POSITION, 
] = [
    "canvas/stage/ZOOM_IN",
    "canvas/stage/ZOOM_OUT", 
    "canvas/stage/MOVE_POSITION", 
];

export const [
    zoomIn,
    zoomOut,
    movePosition,
] = [
    createAction(ZOOM_IN),
    createAction(ZOOM_OUT),
    createAction(MOVE_POSITION),
]

const [ 
    SET_COLOR_PICKER,
] = [
    "canvas/stage/SET_COLOR_PICKER",
];

export const [
    setColorPicker,
] = [
    createAction(SET_COLOR_PICKER),
]

const setContext = bindSimpleAction(["stage"]);

export default {
    [zoomIn]: setContext(["transform"],(transform, payload, state) => {
        const { clientX, clientY } = payload.ev;
        return transform
            .update("scale", scale => scale * 1.1)
            .update("offsetX",offsetX => offsetX + clientX * 0.1)
            .update("offsetY",offsetY => offsetY + clientY * 0.1)

    }),
    [zoomOut]: setContext(["transform"],(transform, payload, state) => {
        const { clientX, clientY } = payload.ev;
        return transform
            .update("scale", scale => scale * 0.9)
            .update("offsetX",offsetX => offsetX - clientX * 0.1)
            .update("offsetY",offsetY => offsetY - clientY * 0.1)
    }),
    [movePosition]: (state,{payload}) => {
        console.log(payload, "미구현")
        return state
    },
    [setColorPicker]:setContext(["activeColorPicker"]),
    
}
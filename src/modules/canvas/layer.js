import { createAction } from "redux-actions";
import shortid from 'shortid';
import { fromJS } from 'immutable'
const [ 
    SELECT_LAYER, 
    RENAME_LAYER,
    ADD_LAYER,
    REMOVE_LAYER,
    TOGGLE_SHOW, 
    TOGGLE_LOCKED, 
    SET_BRIGHTNESS,
    MOVE_UP, 
    MOVE_DOWN
] = [
    "canvas/layer/SELECT_LAYER","canvas/layer/RENAME_LAYER", "canvas/layer/ADD_LAYER", "canvas/layer/REMOVE_LAYER", 
    "canvas/layer/TOGGLE_SHOW", "canvas/layer/TOGGLE_LOCKED", "canvas/layer/SET_BRIGHTNESS", 
    "canvas/layer/MOVE_UP", "canvas/layer/MOVE_DOWN", 
];

export const [
    selectLayer, renameLayer, addLayer, removeLayer,
    toggleShow, toggleLocked, setBrightness,
    moveUp, moveDown
] = [
    createAction(SELECT_LAYER), 
    createAction(RENAME_LAYER), 
    createAction(ADD_LAYER), 
    createAction(REMOVE_LAYER),
    createAction(TOGGLE_SHOW),
    createAction(TOGGLE_LOCKED),
    createAction(SET_BRIGHTNESS),
    createAction(MOVE_UP),
    createAction(MOVE_DOWN),
]

const getInitialBackground = () => ({id:"initialBackground", type:"rect",
x:0, y:0, width:window.innerWidth, height:window.innerHeight, 
strokeWidth:0, strokeStyle:"transparent", fillStyle:"white"})

export const createLayerData = (name = "new Layer", hasBackground = false) => fromJS({
    id: shortid.generate(),
    brightness: 100,
    isShow: true,
    isLocked: false,
    name,
    figuresData: hasBackground ? [getInitialBackground()] : [],
})


// 레이어들을 업데이트하는 액션 반환
const updateLayers = ( callback, id = null ) => (state,{ payload } ) => {
    return state.update("layer",(layers) => {
        id = id || payload.id
        const getIndex = layers.findIndex((layer) => layer.get("id") === id );
        return callback(layers, getIndex, payload);
    })
}

//특정 레이어를 업데이트하는 액션 반환
const updateLayer = ( callback, id = null ) => (
    updateLayers( (layers, index, payload) => (
        layers.update(index, layer => (
            callback(layer, payload )
        ))   
    ), id)
);

/**
 * 레이어의 특정 프로퍼티를 업데이트하는 액션 반환
 * @func
 * @param {string} propName - 변경할 프로퍼티의 이름
 * @param {func} callback
 * @param {string} id - 변경할 레이어의 id, 설정되어 있지 않을 시 payload에서 들어온 id값으로 지정됨
 */
//
export const updateLayerProp = ( propName, updateCallback, id = null ) => (
    updateLayer((layer, payload) => (
        layer.update(propName,(prop) => (
            updateCallback(prop, payload)
        ))
    ), id)
);

export default {
    [selectLayer]: (state, { payload }) => {
        const { id } = payload;
        console.log(id)
        return state.setIn(["context","selected","layer"],id)
    },
    [renameLayer]: updateLayerProp("isLocked",(isLocked, {name} ) => name ),
    [addLayer]: updateLayers((layers) => (
        layers.push(createLayerData("새 레이어"))
    )),
    [removeLayer]: updateLayers((layers, index) => (
        layers.remove(index)
    )),
    [toggleShow]: updateLayerProp("isShow",isShow => !isShow ),
    [toggleLocked]: updateLayerProp("isLocked",isLocked => !isLocked ),
    [setBrightness]: updateLayerProp("isLocked",(isLocked, {brightness} ) => brightness ),
    [moveUp]: updateLayers((layers, index) => {
        if (index <= 0) return layers;
        const oldLayer = layers.get(index);
        return layers.delete(index).insert(index - 1, oldLayer);
    }),
    [moveDown]: updateLayers((layers, index) => {
        if (index + 1 <= layers.size) return layers;
        const oldLayer = layers.get(index);
        return layers.delete(index).insert(index + 1, oldLayer);
    }),
}
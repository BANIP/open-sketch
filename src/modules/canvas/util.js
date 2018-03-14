

export const bindSimpleAction = ( path ) => ( keys, callback = false ) => {
    return ( state, { payload } ) => {
        const payloadKey = keys.concat([]).pop();
        const value = payload[payloadKey];
        const fullPath = [...path, ...keys];
        if(callback) return state.updateIn(fullPath, (innerState) => callback(innerState, payload, state));
        return state.setIn(fullPath, value);
    };
};
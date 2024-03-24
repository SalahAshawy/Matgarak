// tokenReducer.js
const initialState = {
    accessToken: localStorage.getItem('accessToken') || null
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            localStorage.setItem('accessToken', action.payload);
            return {
                ...state,
                accessToken: action.payload
            };
        case "CLEAR_ACCESS_TOKEN":
            localStorage.removeItem('accessToken');
            return {
                ...state,
                accessToken: null
            };
        default:
            return state;
    }
};

export default tokenReducer;

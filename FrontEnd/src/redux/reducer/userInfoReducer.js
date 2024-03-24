// userInfoReducer.js
const initialState = {
    userInfo: localStorage.getItem('userInfo')
};

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            localStorage.setItem('userInfo', action.payload);
            return {
                ...state,
                userInfo: action.payload
            };
        case "CLEAR_USER_INFO":
            localStorage.removeItem('userInfo');
            return {
                ...state,
                userInfo: null
            };
        default:
            return state;
    }
};

export default userInfoReducer;

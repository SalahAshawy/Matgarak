const initialState = {
    isLoggedIn: localStorage.getItem('isLoged')  // Initialize state from localStorage
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOGIN_STATE":
            // Update localStorage when authentication state changes
            localStorage.setItem('isLoged', action.payload);
            return {
                ...state,
                isLoggedIn: action.payload
            };
        default:
            return state;
    }
};

export default loginReducer;

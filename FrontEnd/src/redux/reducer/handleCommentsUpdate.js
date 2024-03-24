const initialState = {
    isUpdated: true 
};

const handleComments = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                isUpdated: false
            };
        default:
            return state;
    }
};

export default handleComments;

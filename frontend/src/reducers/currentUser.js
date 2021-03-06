const currentUser = (
    state = {isLoading: false, error: '', data: {}},
    action
) => {
    switch (action.type) {
        case 'REQUEST_CURRENTUSER_START':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_CURRENTUSER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'REQUEST_CURRENTUSER_FAIL':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default currentUser;
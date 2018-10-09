const users = (state = {isLoading: false, error: null, data: []}, action) => {
  switch(action.type) {
    case 'REQUEST_USERS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.data
      };
    case 'REQUEST_USERS_FAIL':
      console.log(`You failed to request data... ${action.error}`)
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default users;

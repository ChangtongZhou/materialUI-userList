import axios from 'axios';

function requestStart() {
    return {
        type: 'REQUEST_CURRENTUSER_START'
    };
}

function requestSuccess(response) {
    return {
        type: 'REQUEST_CURRENTUSER_SUCCESS',
        data: response.data
    };
}

function requestFail(error) {
    return {
        type: 'REQUEST_CURRENTUSER_FAIL',
        error
    };
}

export function getCurrentUser(id) {
    return (dispatch, store) => {
        dispatch(requestStart());
        axios
        .get(`/api/getUser/${id}`)
        .then(response => {
            dispatch(requestSuccess(response));
        })
        .catch(err => {
            dispatch(requestFail(err));
        });
    };
}


export function editCurrentUser(id, user) {
    return (dispatch, store) => {
        dispatch(requestStart());
        axios
        .put(`/api/editUser/${id}`, user)
        .then(response => {
            dispatch(requestSuccess(response));
        })
        .catch(err => {
            dispatch(requestFail(err));
        })
    }
}

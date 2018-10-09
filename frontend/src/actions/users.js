import axios from 'axios';

function requestStart() {
    return {
        type: 'REQUEST_USERS_START'
    };
}

function requestSuccess(response) {
    return {
        type: 'REQUEST_USERS_SUCCESS',
        data: response.data
    };
}

function requestFail(error) {
    return {
        type: 'REQUEST_USERS_FAIL',
        error
    };
}

export function getUsers() {
    return (dispatch, store) => {
        dispatch(requestStart());
        axios
        .get('/api/users')
        .then(response => {
            dispatch(requestSuccess(response));
        })
        .catch(err => {
            dispatch(requestFail(err));
        });
    };
}

export function addUser(newUser) {
    return (dispatch, store) => {
        dispatch(requestStart());
        axios({
            method: 'post',
            url: '/api/addUser',
            data: newUser
        })
        .then(response => {
            dispatch(requestSuccess(response));
        })
        .catch(err => {
            dispatch(requestFail(err));
        })
    }
}

export function deleteUser(id) {
    return (dispatch, store) => {
        dispatch(requestStart());
        axios
        .delete(`/api/deleteUser/${id}`)
        .then(response => {
            dispatch(requestSuccess(response));
        })
        .catch(err => {
            dispatch(requestFail(err));
        });
    }
}

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_USERS = 'SET_USERS';

const reducer = (state = [], action) => {
    switch (action.type) {
        case SET_USERS:
            state = action.users
            break;
        }
    return state;
}

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

const fetchUsers = () => {
    return (dispatch) => {
        return axios.get('/api/users')
            .then(response => response.data)
            .then(users => dispatch(setUsers(users)))
            .catch(ex => console.log(ex.message))
    }
}

const onSaveUser = (user) => {
    return (dispatch) => {
        return axios[user.id ? 'put' : 'post'](`/api/users/${user.id ? user.id : 'create'}`, user)
            .then(() => dispatch(fetchUsers()))
            .catch(ex => console.log(ex.message))
    }
}

const destroyUser = (id) => {
    return (dispatch) => {
        return axios.delete(`/api/users/${id}`)
            .then( () => dispatch(fetchUsers()))
    }
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store;
export  { setUsers, fetchUsers, onSaveUser, destroyUser }

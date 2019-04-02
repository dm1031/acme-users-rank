import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const SET_USERS = "SET_USERS";

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      //NOTE: here instead of reasigning the new state to the same "state" variable, it's considered best practice to return an entirely new obj as state.
      //in this particular case, state is just a single array of objects so best practice would look like the following:

      //return action.users;

      //reasigning the state variable to the new state (state = action.users) is considered mutation, because it is reusing the same variable (location in memory). one of the main tenents of redux is that it is ideally made up of pure, non-mutating functions. so while your code below works and is completely valid, redux best-practice would be to return a the new state directly without reasigning the state variable.
      //here's a decent post on this topic: https://stackoverflow.com/questions/37531909/redux-why-is-avoiding-mutations-such-a-fundamental-part-of-using-it

      state = action.users;
      break;
  }
  return state;
};

const setUsers = users => {
  return {
    type: SET_USERS,
    users
  };
};

const fetchUsers = () => {
  return dispatch => {
    return axios
      .get("/api/users")
      .then(response => response.data)
      .then(users => dispatch(setUsers(users)))
      .catch(ex => console.log(ex.message));
  };
};

const onSaveUser = user => {
  return dispatch => {
    return axios[user.uuid ? "put" : "post"](
      `/api/users/${user.uuid ? user.uuid : "create"}`,
      user
    )
      .then(() => dispatch(fetchUsers()))
      .catch(ex => console.log(ex.message));
  };
};

const destroyUser = uuid => {
  return dispatch => {
    return axios
      .delete(`/api/users/${uuid}`)
      .then(() => dispatch(fetchUsers()));
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
export { setUsers, fetchUsers, onSaveUser, destroyUser };

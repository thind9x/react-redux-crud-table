import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";
const initUser = {
  numberUser: 0,
  arr: [],
  users: [],
};
const getalluser = (state = initUser, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        loading: true,
        ...state,
        users: action.payload,
        error: "",
      };

    case "FETCH_ERROR":
      return {
        ...state,
        error: "error",
      };
    default:
      return state;
  }
};
const getalluserbyid = (state = { userbyid: {} }, action) => {
  switch (action.type) {
    case "FETCH_USER_BY_ID":
      return {
        loading: true,
        userbyid: action.payload,
        error: "",
      };

    case "FETCH_ERROR":
      return {
        userbyid: {},
        error: "error",
      };
    default:
      return state;
  }
};
const adduser = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        loading: true,
        users: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        user: [],
        error: "error",
      };
    default:
      return state;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const reducers = combineReducers({
  getalluser,
  adduser,
  getalluserbyid,
});

const persistedState = loadState();
const store = createStore(reducers, persistedState);
store.dispatch({
  type: "ADD_CARD",
  payload: {},
});
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
export default store;

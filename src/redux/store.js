import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import mainPageReducer from "./mainPage-reducer";


let redusers = combineReducers({
    mainPage: mainPageReducer,
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;
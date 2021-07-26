import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root";

const initialState = {};

const middleWare = [thunk];

export const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

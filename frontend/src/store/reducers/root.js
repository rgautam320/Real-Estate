import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

const root = combineReducers({
	alert,
	auth,
});

export default root;

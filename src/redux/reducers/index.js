import { combineReducers } from "redux";
import candidates from "./candidates";
import ballotCreate from "./ballotCreate";

export default combineReducers({candidates,ballotCreate});
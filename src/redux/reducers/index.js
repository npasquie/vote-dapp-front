import { combineReducers } from "redux";
import candidates from "./candidates";
import ballotCreate from "./ballotCreate";
import ethereum from "./ethereum";

export default combineReducers({candidates,ballotCreate,ethereum});
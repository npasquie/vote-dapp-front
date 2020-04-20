import { combineReducers } from "redux";
import candidates from "./candidates";
import ballotCreate from "./ballotCreate";
import ethereum from "./ethereum";
import vote from "./vote";

export default combineReducers({candidates,ballotCreate,ethereum,vote});
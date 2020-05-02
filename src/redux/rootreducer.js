import {combineReducers} from "redux";
import userReducer from "./user/userreducer";

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer;
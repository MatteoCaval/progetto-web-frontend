import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import catalogReducer from "./catalog/catalog.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    catalog: catalogReducer
})

export default rootReducer;
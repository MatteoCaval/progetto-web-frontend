import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import catalogReducer from "./catalog/catalog.reducer";
import cartReducer from "./cart/cart.reducer";
import productOperationsReducer from "./catalog/product/product-operations.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    productOperations: productOperationsReducer
})

export default rootReducer;
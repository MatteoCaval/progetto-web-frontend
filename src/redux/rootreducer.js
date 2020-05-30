import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import catalogReducer from "./catalog/catalog.reducer";
import cartReducer from "./cart/cart.reducer";
import productOperationsReducer from "./catalog/product/product-operations.reducer";
import alertReducer from "./alerts/alert.reducer";
import adminReducer from "./admin/admin.reducer";
import ordersReducer from "./orders/orders.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    productOperations: productOperationsReducer,
    alert: alertReducer,
    adminData: adminReducer,
    orders: ordersReducer

})

export default rootReducer;
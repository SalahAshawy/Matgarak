import  handleCart from "./handleCart";
import {  combineReducers} from "redux";
import loginReducer from "./loginReducer";
import tokenReducer from "./tokenReducer";
import userInfoReducer from "./userInfoReducer";
import handleComments from "./handleCommentsUpdate";

const rootReducers =combineReducers({
    handleCart,
    login: loginReducer,
    token: tokenReducer,
    user:userInfoReducer,
    handleComments
});
export default rootReducers;
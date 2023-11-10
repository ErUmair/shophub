import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { signupReducer, loginReducer, productReducer, cartReducer } from './_reducers/productReducer';

const rootReducer = combineReducers({
    products: productReducer,
    userSignup: signupReducer,
    userLogin: loginReducer,
    cart: cartReducer,
});

const composed = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composed(applyMiddleware(thunk))
);

export default store;
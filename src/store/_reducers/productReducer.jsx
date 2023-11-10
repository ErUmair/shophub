import {
    REQUEST_FETCH_PRODUCTS,
    SUCCESS_FETCH_PRODUCTS,
    FAIL_FETCH_PRODUCTS,
    REQUEST_SIGNUP,
    SUCCESS_SIGNUP,
    FAIL_SIGNUP,
    REQUEST_LOGIN,
    SUCCESS_LOGIN,
    FAIL_LOGIN,
    SUCCESS_LOGOUT,
    ADD_TO_CART,
    DELETE_FROM_CART,
} from '../_actions/actionType';

const signupInitiialState = {
    isLoading: false,
    isError: false,
    errorMessage: null,
}

const signupReducer = (state = signupInitiialState, { type, payload }) => {
    switch (type) {
        case REQUEST_SIGNUP:
            return {
                ...state,
                isLoading: true,
            };
        case SUCCESS_SIGNUP:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: null,
            };

        case FAIL_SIGNUP:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: payload,
            };

        default:
            return state;
    }
};

const loginInitialState = {
    isLoading: false,
    user: localStorage.getItem("user"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    isError: false,
    errorMessage: null,
}

const loginReducer = (state = loginInitialState, { type, payload }) => {
    switch (type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case SUCCESS_LOGIN:
            return {
                ...state,
                isLoading: false,
                user: payload,
                isLoggedIn: true,
                isError: false,
                errorMessage: null,
            };

        case FAIL_LOGIN:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: payload,
                user: null,
                isLoggedIn: false,
            };

        case SUCCESS_LOGOUT:
            localStorage.setItem("isLoggedIn", false);
            return {
                ...state,
                isLoggedIn: false,
                token: null,
            };
        default:
            return state;
    }
};

const productsInitialState = {
    isLoading: false,
    products: [],
    isError: false,
    errorMessage: null,
};

const productReducer = (state = productsInitialState, { type, payload }) => {
    switch (type) {
        case REQUEST_FETCH_PRODUCTS:
            return {
                ...state,
                isLoading: true,
            };

        case SUCCESS_FETCH_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: payload,
                isError: false,
                errorMessage: null,
            };

        case FAIL_FETCH_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: [],
                isError: true,
                errorMessage: payload,
            };

        default:
            return state;
    }
};

const cartInitialState = {
    cart: []
}

const cartReducer = (state = cartInitialState, {type,payload}) => {
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, {
                    id: payload.id,
                    name: payload.name,
                    brand: payload.brand,
                    quantity: payload.quantity
                }]
            };
        default:
            return state;
    }

};

export {signupReducer,loginReducer,productReducer,cartReducer};
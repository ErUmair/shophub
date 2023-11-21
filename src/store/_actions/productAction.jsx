import axios from "axios";
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
    ADD_TO_CART,
    DELETE_FROM_CART
} from './actionType';

export const signup = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REQUEST_SIGNUP,
            });
            const res = await axios.post(
                "https://654f1829358230d8f0cd0161.mockapi.io/shophubAuthApi/user",
                props
            );
            dispatch({
                type: SUCCESS_SIGNUP,
            });
        } catch (error) {
            dispatch({
                type: FAIL_SIGNUP,
                payload: error.message
            });
        }
    };
};

export const login = (props) => {
    let { email, password } = props;

    return async (dispatch) => {
        try {
            dispatch({
                type: REQUEST_LOGIN,
            });
            const response = await axios.get(
                "https://654f1829358230d8f0cd0161.mockapi.io/shophubAuthApi/user"
            );
            let filteredData = response.data.filter((e) => {
                return e.email === email && e.password === password;
            });
            if (filteredData.length !== 0) {
                dispatch({
                    type: SUCCESS_LOGIN,
                    payload: filteredData[0].id,
                });
            } else {
                throw new Error("please look into your credentials");
            }

            // store token id and Logged flag

            localStorage.setItem("user", filteredData[0].id);
            localStorage.setItem("isLoggedIn", true);
        } catch (error) {
            dispatch({
                type: FAIL_LOGIN,
                payload: error.message,
            });
        }
    };
};

export const fetchProducts = (product) => {
    return async (dispatch) => {
        try {
            dispatch({ type: REQUEST_FETCH_PRODUCTS });
            const response = await axios.get("https://fakestoreapi.com/products", {
                params: {
                    sort: product,
                },
            });
            dispatch({
                type: SUCCESS_FETCH_PRODUCTS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: FAIL_FETCH_PRODUCTS, payload: error.message });
        }
    };
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
};

export const deleteFromCart = (product) => {
    return {
        type: DELETE_FROM_CART,
        payload: product
    }
}
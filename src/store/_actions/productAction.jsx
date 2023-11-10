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
    return async (keep) => {
        try {
            keep({
                type: REQUEST_SIGNUP,
            });
            const res = await axios.post(
                "https://654cc2d477200d6ba8595e66.mockapi.io/user",
                props
            );
            keep({
                type: SUCCESS_SIGNUP,
            });
        } catch (error) {
            keep({
                type: FAIL_SIGNUP,
                payload: error.message
            });
        }
    };
};

export const login = (props) => {
    let { email, password } = props;

    return async (keep) => {
        try {
            keep({
                type: REQUEST_LOGIN,
            });
            const response = await axios.get(
                "https://654cc2d477200d6ba8595e66.mockapi.io/user"
            );
            let filteredData = response.data.filter((e) => {
                return e.email === email && e.password === password;
            });
            if (filteredData.length !== 0) {
                keep({
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
            keep({
                type: FAIL_LOGIN,
                payload: error.message,
            });
        }
    };
};

export const fetchProducts = (product) => {
    return async (keep) => {
        try {
            keep({ type: REQUEST_FETCH_PRODUCTS });
            const response = await axios.get("https://fakestoreapi.com/products", {
                params: {
                    sort: product,
                },
            });
            keep({
                type: SUCCESS_FETCH_PRODUCTS,
                payload: response.data,
            });
        } catch (error) {
            keep({ type: FAIL_FETCH_PRODUCTS, payload: error.message });
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
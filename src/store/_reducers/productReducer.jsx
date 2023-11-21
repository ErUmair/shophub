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
    products: []
}

const cartReducer = (state = cartInitialState, {type,payload}) => {
    switch (type) {
        case ADD_TO_CART:
            let findProduct = state.products.find(x=>x.id === payload.id);
            if(findProduct){
                return {
                    ...state,
                    products: state.products.map(product =>
                        product.id === payload.id ? { ...product, qty: product.qty+1} : product,
                    ),
                } 
            }else{
                return{
                    ...state,
                    products: [...state.products, {...payload,qty:1}]
                    
                }
            }
            
        case DELETE_FROM_CART:
            const isExist = state.products.find(x=>x.id === payload.id);
            if(isExist.qty === 1){
                return {
                    ...state,
                    products: state.products.filter(x=>x.id !== isExist.id)     
                };
            }else{
                return {
                    ...state,
                    products:state.products.map(x=>x.id === payload.id ? {...x, qty: x.qty-1} : x)
                }
            }
            
        default:
            return state;
    }
    // switch (type) {
    //     case ADD_TO_CART:
    //         let findProduct = state.products.find(x=>x.id === payload.id);
    //         if(findProduct){
    //             return {
    //                 ...state,
    //                 products: state.products.map(product =>
    //                     product.id === findProduct.id ? { ...product, qty: product.qty+1} : product,
    //                 ),
    //             }
    //         }else{
    //             return{
    //                 ...state,
    //                 products: {...payload,qty:1}
                    
    //             }
    //         }
            
    //     case DELETE_FROM_CART:
    //         const isExist = state.products.find(x=>x.id === payload.id);
    //         if(isExist.qty === 1){
    //             return {
    //                 ...state,
    //                 products: state.products.filter(x=>x.id === isExist.id)     
    //             };
    //         }else{
    //             return {
    //                 ...state,
    //                 products:state.products.map(x=>x.id === payload.id ? {...x, qty: x.qty-1} : x)
    //             }
    //         }
            
    //     default:
    //         return state;
    // }

};

export { signupReducer, loginReducer, productReducer, cartReducer };


// const cart = [];
// const cartReducer = (state = cart, action) => {
//     const product = action.payload;
//     switch (action.type) {
//         case ADD_TO_CART:
//             const exist = state.find(x => x.id === product.id)
//             if (exist) {
//                 return state.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
//             } else {
//                 const product = action.payload;
//                 return [...state, { ...product, qty: 1, }]
//             }

//         case DELETE_FROM_CART:
//             const isExist = state.find(x => x.id === product.id);
//             if (isExist.qty === 1) {
//                 return state.filter(x => x.id !== isExist.id);
//             } else {
//                 return state.map(x => x.id === product.id ? { ...x, qty: x.qty - 1 } : x);
//             }

//         default: return state
//     }
// }

// export default cartReducer 
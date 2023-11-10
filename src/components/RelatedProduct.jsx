import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchProducts } from "../store/_actions/productAction"
import { FaBagShopping } from "react-icons/fa6";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";
import { ADD_TO_CART } from "../store/_actions/actionType";
// import Loader from "../Loader";

const RelatedProduct = () => {
    let dispatch = useDispatch();
    let { isLoading, isError, products, errorMessage } = useSelector(
        (store) => store.products
    );
    let { isLoggedIn } = useSelector((store) => store.userLogin);

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    let handleNavigate = (id) => {
        navigate(`/shop/${id}`);
    };

    let handleCart = (product) => {
        if (isLoggedIn) {
            dispatch({ type: ADD_TO_CART, payload: product });
            navigate(`/cart`);
        } else navigate("/login");
    };


    return (
        <div className="">
            
        <WRAPPER flag={(isError && errorMessage) || isLoading}>
            
            {isLoading ? (
                'loading...'
            ) : isError && errorMessage ? (
                <div className="errormessage">
                    <p className="errorIcon">
                        <TbFaceIdError />
                    </p>
                    <p> {errorMessage}</p>
                </div>
            ) : (
                <>
                    {products.length !== 0 ? (
                        <>
                        <h4 className="text-center fw-bold">Related Products</h4>
                        <div className="container">
                        
                            {products.slice(0,4).map((ele, i) => {
                                return (
                                    <div key={ele.id}>
                                        <div className="icons">
                                            <HiOutlineArrowsExpand
                                                className="icon"
                                                onClick={() => {
                                                    handleNavigate(ele.id);
                                                }}
                                            />
                                            <FaBagShopping
                                                className="icon"
                                                onClick={() => {
                                                    handleCart(ele);
                                                }}
                                            />
                                        </div>
                                        <img src={ele.image} alt={ele.title} loading="lazy" />
                                        <h3>{ele.title}</h3>
                                        <h4>{ele.price}</h4>
                                    </div>
                                );
                            })}
                        </div>
                        </>
                    ) : null}
                </>
            )}
        </WRAPPER>
        </div>
    );
};

export default RelatedProduct;

let WRAPPER = styled.div`
  padding: 1rem;
  height: ${({ flag }) => (flag ? "100vh" : "")}
  }

  .errormessage {
    text-align: center;
    margin-top: 7rem;

    .errorIcon {
      font-size: 4rem;
    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top:2rem;

    div {
      background-color: #f8d4bd;
      background-image: radial-gradient(#dfa57f 8%,transparent 0);
      box-shadow: inset 0 0 5rem 2rem #fff;
      background-size: 1.8rem 1.8rem;
      text-align: center;
      padding: 1rem;
      border-radius: 4rem;
      .icons {
        display: flex;
        justify-content: space-between;
        .icon {
          width: 2.8rem;
          height: 2.8rem;
          padding: 10px;
          border-radius: 100%;
          background-color: #f8f6f2;
          box-shadow: 0 0 0.2rem rgba(0,0,0,.5);
          opacity: .8;
          cursor: pointer;
          &:hover {
            color: #c05f09;
          }
        }
      }
      img {
        width: 15rem;
        height: 15rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin-bottom: 1rem;
      }
    }
  }
`;

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../store/_actions/actionType";
import RelatedProduct from "../components/RelatedProduct";

const Shop = () => {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let dispatch = useDispatch();
  let { isLoggedIn } = useSelector((store) => store.userLogin);
  let navigate = useNavigate();

  useEffect(() => {
    let product_func = async () => {
      let res = await fetch(`https://fakestoreapi.com/products/${id}`);
      let data = await res.json();
      setProduct(data);
    };

    product_func();
  }, [id]);

  let handleCart = (pro) => {
    if (isLoggedIn) {
      dispatch({ type: ADD_TO_CART, payload: product });
      navigate(`/cart`);
    } else navigate("/login");
  };

  return (
    <>
    <WRAPPER flag={Object.keys(product).length === 0}>
      {Object.keys(product).length === 0 ? (
        <div className="LoaderWrapper">
          Loading...
        </div>
      ) : (
        <Body>
          <ContainerDiv>
            <div className="DetailsWrapper">
              <h1>{product.title}</h1>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>ID: {id}</p>
              <p>Price: ${product.price}</p>
              <p>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>

            <div className="ImageWrapper">
              <ProductImage src={product.image} alt={product.title} />
              <button onClick={handleCart}> Add To Cart</button>
            </div>
          </ContainerDiv>
        </Body>
      )}
    </WRAPPER>
    <RelatedProduct/>
    </>
  );
};

export default Shop;

const WRAPPER = styled.div`
  background-color: #f8d4bd;
  height: ${({ flag }) => (flag ? "100vh" : "")};

  .LoaderWrapper {
    padding-top: 6rem;
  }
`;

const Body = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerDiv = styled.div`
  background-color: white;
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;

  .DetailsWrapper {
    width: 60%;
  }
  .ImageWrapper {
    img {
      display: block;
      margin: auto;
    }
    button {
      width: 100%;
      height: 3rem;
      margin-top: 1rem;
      background-color: #fa8907;
      border: 0;
      border-radius: 7px;
      cursor: pointer;
      font-size: 1.3rem;
      color: white;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    width: 90%;
    .DetailsWrapper {
      width: 100%;
    }
  }
`;

const ProductImage = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 5px;
`;

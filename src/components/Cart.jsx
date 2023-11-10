import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TbMoodSad } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToCart, deleteFromCart } from '../store/_actions/productAction'

const Cart = () => {
  // const state = useSelector(state => state.cartReducer)
  let { isLoading, products,cart } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch()
  const handleAdd = (item) => {
    dispatch(addToCart(item))
  }

  const handleDelete = (item) => {
    dispatch(deleteFromCart(item))
  }

  const emtyCart = () => {
    return (
      <div style={{marginBottom:"250px"}}>
      <div className="px-4 py-4 my-5 bg-white rounded-3">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty ! <TbMoodSad /></h3>
          </div>
        </div>
      </div>
      </div>
    )
  }

  const cartItems = (product) => {
    return (
      <>
        <div className="px-4 py-4 my-5 bg-white rounded-3">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <Card.Img src={product.image} alt={product.title} height="200px" width="180px" />
              </div>
              <div className="col-md-4">
                <h3>{product.title}</h3>
                <p className="lead fw-bold">
                  {product.qty} X ${product.price} = $
                  {product.qty * product.price}
                </p>
                <div className='d-flex'>
                <Button variant="btn btn-outline-dark" className=" me-4" onClick={() => handleDelete(product)}><AiOutlineMinus /></Button>
                <span className="me-4 fs-4 fw-bold">{product.qty}</span>
                <Button variant="btn btn-outline-dark" className="me-4" onClick={() => handleAdd(product)}><AiOutlinePlus /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const button = () => {
    return(
      <>
      <div className="container">
        <div className="row">
          <NavLink to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">Proceed to Checkout</NavLink>
        </div>
      </div>
    </>
    )
  }
  // return (
  //   <div>
  //     {cart.length === 0 && emtyCart()}
  //     {cart.length !== 0 && cart.map(cartItems)}
  //     {cart.length !== 0 && button()}
  //   </div>
  // )
}

export default Cart;
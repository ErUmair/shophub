
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import { SignupSchema } from "./Schema"
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/_actions/productAction";
// import Loader from "./Loader";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  let { isLoading, isError, errorMessage } = useSelector(
    (store) => store.userSignup
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupSchema,
      onSubmit: (values, action) => {
        dispatch(signup(values));
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        action.resetForm();
      },
    });

  return (
    <DIV>
      <div className="Container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <legend>Name</legend>
            <input
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              name="name"
              value={values.name}
            />
            {errors.name && touched.name ? <p>{errors.name}</p> : ""}
          </div>

          <div className="inputBox">
            <legend>Email</legend>
            <input
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              value={values.email}
            />
            {errors.email && touched.email ? <p>{errors.email}</p> : ""}
          </div>

          <div className="inputBox">
            <legend>Password</legend>
            <input
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              value={values.password}
            />
            {errors.password && touched.password ? (
              <p>{errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <button type="submit">Signup</button>

          <p>
            Already a User? <Link to={"/login"}>Sign in Now</Link>
          </p>
        </form>
      </div>

      {isLoading ? (
        <div className="LoaderContainer">
          loading...
        </div>
      ) : isError ? (
        <div className="errorConatainer">
          <p>{errorMessage}</p>
        </div>
      ) : (
        ""
      )}
    </DIV>
  );
};

export default Signup;

let DIV = styled.div`
  height: 100vh;

  .Container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: max-content;
    padding: 3rem;
    border-radius: 8px;
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }

    .inputBox {
      width: 19rem;
      margin-bottom: 1rem;
      input {
        height: 2rem;
        border: 0.5px solid grey;
        width: 100%;
        border-radius: 6px;
        outline: 0;
        padding-left: 1rem;
        font-weight: 600;
      }
    }

    button {
      width: 100%;
      margin-bottom: 1rem;
      background-color: #2d2c2ca4;
      border: 0;
      font-size: 1.2rem;
      padding: 5px;
      border-radius: 6px;
      cursor: pointer;
      color: #f8d4bd;
    }
    p {
      font-weight: 600;
      a {
        text-decoration: none;
        margin-left: 2px;
      }
    }
  }

  .LoaderContainer {
    position: fixed;
    background-color: #2d2c2ca4;
    z-index: 3;
    height: 100vh;
    width: 100%;
    padding-left: 5rem;
  }

  .errorConatainer {
    text-align: center;
    background-color: red;
    width: max-content;
    margin: auto;
    padding: 10px;
    border-radius: 9px;
    color: white;
  }
`;

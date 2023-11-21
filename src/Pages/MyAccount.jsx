import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SUCCESS_LOGOUT } from "../store/_actions/actionType";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  let [userName, setUserName] = useState({});
  let { user } = useSelector((store) => store.userLogin);
  console.log(user)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    let FetchUser = async () => {
      let res = await fetch(
        `https://654f1829358230d8f0cd0161.mockapi.io/shophubAuthApi/user/${user}`
      );
      let data = await res.json();

      setUserName(data);
    };

    FetchUser();
  }, [user]);

  let handleClick = () => {
    dispatch({ type: SUCCESS_LOGOUT });
    navigate("/");
  };



  return (
    <DIV>
      <h1> Hi ! {userName.name}</h1>
      <p>Your email is : {userName.email}</p>
      <button onClick={handleClick}>Log Out</button>
    </DIV>
  );
};

export default MyAccount;

let DIV = styled.div`
  height: 100vh;
  text-align: center;
  margin-top: 10%;
  h1 {
    font-size: 4rem;
    letter-spacing: 2px;
  }
  p {
    margin-bottom: 1rem;
    font-weight: 600;
  }
  button {
    width: 10rem;
    padding: 10px 20px;
    border: 0;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
  }
`;

import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <DIV className='d-flex justify-content-center align-items-center p-3'>
        <p>
        "Copyright" 
        &copy;
        "2021 | All Rights Reserved."
        </p>
    </DIV>
  )
}

export default Footer;

const DIV = styled.div`
background-color: #f8d4bd;
grid-area:footer;
font-size:1.2rem;`
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainRoute from './Routes/MainRoute';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{backgroundColor:'#f8d4bd'}}>
      <Navbar/>
      <MainRoute/>
      <Footer/>
    </div>
  )
}

export default App

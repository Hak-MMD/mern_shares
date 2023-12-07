import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Public() {

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className='public'>
       
        <h2 className='headerName'>Welcome</h2> 
        <p className='publicText'>
            This app provides you a demo account where you can buy/sell shares and bitcoins, improve your experience!
        </p>
        <div className="buttonsPublicB">
            <button onClick={() => navigate('/login')} className='btn'>Login</button>
            <button onClick={() => navigate('/register')} className='btn'>Register</button>
        </div>
    </div>
    </>

  )
}

export default Public
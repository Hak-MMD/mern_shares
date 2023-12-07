import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from './userApiSlice';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

function Login() {
    // const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const userRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [email, password]);

    const loginFunc = async () => {
        // e.preventDefault()
        login({email, password}).then(() => {
            setEmail('');
            setPassword('');
            // if (token) {
                navigate('/account');  
                // document.location.reload();
            // }
        });
    };

    const content = (
        <>
        <Header />
          <div className='signPage'>

            <h2 className='headerName'>Login</h2>
            <h4 className='headerName'>Login into your own demo account!</h4>
            <div className="group">  
                <input ref={userRef} className='inp' type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
                <input className='inp' type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} />
                <button className='btn inp' onClick={() => {loginFunc()}}>Login</button>
                <p>Don't have an account? <a style={{ color:'#078562', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</a>
                </p>
            </div>

        </div>
        </>
      
    )

  return content;
}

export default Login
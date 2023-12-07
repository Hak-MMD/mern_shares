import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Loader from '../../components/Loader';
import { register } from './userApiSlice';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

function Register() {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const userRef = useRef();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { isAuth } = useAuth();

    useEffect(() => {
        console.log(isAuth);
        if (isAuth) {
            navigate('/account')
        }
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [username, email, password]);

    const registerFunc = async () => {
        // e.preventDefault()
        register({username, email, password}).then(() => {
            setEmail('');
            setPassword('');
            setUsername('');

           
            // if (token) {
                navigate('/account');  
            //     document.location.reload();
            // }
        });
    };

    // if (isLoading) return <div style={{ textAlign: 'center' }}><Loader /></div>
    const content = (
        
       <> 
        <Header />

       <div className='signPage'>

            <h2 className='headerName'>Register</h2>
            <h4 className='headerName'>Register and get your own demo account!</h4>
            <div className="group">
                { errMsg == '' ? <p></p> : <p>{errMsg}</p>}
                <input ref={userRef} className='inp' type="text" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} />
                <input className='inp' type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
                <input className='inp' type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} />
                <button className='btn inp' onClick={() => {registerFunc()}}>Register</button>
                <p>Already have an account? <a style={{ color:'#078562', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</a></p>

            </div>    
        </div></>
    )

  return content;
}

export default Register
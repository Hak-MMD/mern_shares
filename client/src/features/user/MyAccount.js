import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import {store} from '../../app/store'
import { Logout } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import { allStocks } from '../stock/stockApiSlice';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

function MyAccount() {
    const token = useSelector((state) => state.user.token);
    const wallet = useSelector((state) => state.user.wallet);
    const navigate = useNavigate();
    const { username, email, isAuth } = useAuth();

    console.log(token);

    useEffect(() => {
        setTimeout(() => {
            let dataArr = allStocks();
            console.log(dataArr);
        }, 1000);        
    }, []);

    
    
    const logoutFunc = () => {
        Logout();
        navigate('/login');
    };
  return (
    <>
        <Header />
        <div className="card">
            <div className="info">
                <h2>My Account</h2>
                <p><span>Username:</span> {username}</p>
                <p><span>Email:</span> {email}</p>
            </div>
            <div className="wallet">
            <p><span>Current Wallet Value:</span> ${wallet}</p>
            </div>
            <div style={{ width: 270, marginTop: 5}}>
                <button style={{ marginBottom: 3 }} className='btn'>Manage Stocks</button>
                <button style={{ paddingLeft: 19.5, paddingRight: 19.5 }} className='btn'>Wallet</button>
                <button style={{ marginBottom: 3 }} onClick={() => {logoutFunc()}} className='btn'>Logout</button>
                <button className='btn'>Delete Account</button>
               

                
            </div>
        </div>
    </>

)
}

export default MyAccount
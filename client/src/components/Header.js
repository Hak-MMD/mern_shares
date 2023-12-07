import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCurrentWallet } from '../features/user/userSlice';

function Header() {
const navigate = useNavigate();

const { isAuth } = useAuth();
// console.log(wallet);
const wallet = useSelector((state) => state.user.wallet);
// console.log(wallet);

  return (
    <div className='header'>
        <div className="nav">
            <input type="checkbox" id="nav-check"/>
            <div className="nav-header">
                <div className="nav-title">
                    SharesApp
                </div>
            </div>
            <div className="nav-btn">
                <label for="nav-check">
                <span></span>
                <span></span>
                <span></span>
                </label>
            </div>

            <div className="nav-links">
                {
                    isAuth ? (
                        <div className="nav-links">
                            <a onClick={() => {navigate('/stocks')}} target="_blank">Stocks</a>
                            <a onClick={() => {navigate('/stocks/dash')}} target="_blank">Dashboard</a>
                            <a onClick={() => {navigate('/account')}} target="_blank">Account</a>
                            <a onClick={() => {navigate('/account')}} target="_blank">${wallet}</a>
                        </div>
                    ) : (
                        <div className="nav-links">
                            <a onClick={() => {navigate('/login')}} target="_blank">Login</a>
                            <a onClick={() => {navigate('/register')}} target="_blank">Register</a>
                        </div>
                    )
                }
              </div>
        </div>
    </div>
  )
}

export default Header
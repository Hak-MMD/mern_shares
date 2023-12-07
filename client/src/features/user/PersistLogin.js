import React, { useEffect, useRef, useState } from 'react'
import { getMe, refresh } from './userApiSlice'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './userSlice';
import { store } from '../../app/store';

function PersistLogin() {

    const token = useSelector(state => state.user.token);
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false);
  

    // if (!token) {
    useEffect(() => {
        // console.log(token);

        

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                // console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    await getMe();
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            // setInterval(() => {
            //     verifyRefreshToken();
            // }, 9000);
            if (!token) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    // }

    let content;

    if (token || trueSuccess || token && trueSuccess) {
        content = <Outlet />
    } else if ( !store.getState().user.token || !trueSuccess && !store.getState().user.token) {

        setTimeout(() => {
            content =  (
            <div style={{ textAlign: 'center' }}>
                <h1 style={{   fontSize: '80px', marginBottom: '20px', color: '#d9534f' }}>Unauthorized</h1>
                <p style={{   fontSize: '20px', marginBottom: '20px', color: '#333333' }}>To access this page you need to be authorized!</p>
                <Link style={{   textDecoration: 'underline', fontWeight: 'bold', color: '#078562' }} to="/login">Please login again!</Link>
            </div>
        )
        }, 0)        
    }
  return content
}

export default PersistLogin
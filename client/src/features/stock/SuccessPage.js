import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


function SuccessPage() {

    const navigate = useNavigate();
  return (
    <>
        <Header />
        <div style={{ textAlign: 'center', margin: '20px', padding: "10px" }} className="centered">
            <h3>Operation was completed successfully!</h3>
            <button style={{ margin: '20px' }} className='btn' onClick={() => { navigate('/stocks/dash') }}>Manage Shares</button>
        </div>
    </>
  )
}

export default SuccessPage
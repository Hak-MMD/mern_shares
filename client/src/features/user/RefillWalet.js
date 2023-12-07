import React from 'react'
import Header from '../../components/Header'

function RefillWallet() {
  return (
    <div className='refill'>
        <Header />

        <h2 className='headerName'>Refill Wallet</h2>
        <input className='inp' placeholder='Enter value...' type="number" />
        <button className='btn'>Refill</button>
    </div>
  )
}

export default RefillWallet
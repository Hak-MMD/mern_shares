import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
// import { current } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { buyStock } from './stockApiSlice';
// import { checkStock } from './stockApiSlice';
// import { useRef } from 'react';

function BuyStock() {
  const params = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [pay, setPay] = useState(0);
  // const effectRan = useRef(false)
  // const price = useSelector((state) => state.stock.price);
  const price = 235; //for testing
  const wallet = useSelector((state) => state.user.wallet);


  const getBuyStock = async () => {
    await buyStock(params.code, count, price);
    navigate('/stocks/success')
  };

  const modalOpen = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  };

  const modalClose = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  };

  useEffect(() => {
    setPay(count * price);
    // setPay(pay.parseInt().toFixed(2));
    // setCount(pay / params.price);
  }, [count]);

  useEffect(() => {
    // setPay(count * params.price);  
    setCount(pay / price);
    // setCount(count.parseFloat().toFixed(2));
  }, [pay]);
  return (
    <>
        <Header />

      <div className='card'>
        <div style={{ margin: '15px', marginBottom: 10, textAlign: 'center' }} className="genInfo">
            <h2>Code : {params.code}</h2>
        </div>
        <div style={{ textAlign: 'center', }} className="buyCount">
          <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Select amount of shares:</p>
          {
            count <= 0 ? <button style={{ backgroundColor: 'grey', fontSize: '25px' }} className='btn'>-</button> : <button  style={{ fontSize: '25px' }} onClick={() => {     
              if (count < 1) {
                setCount(0)
              } else {
                setCount(count - 1) 

              }
            }} className='btn'>-</button>

          }
            <input readOnly className='inp' type="number" style={{ width: '100px', marginRight: '15px' }} value={count} onChange={(e) => {setCount(e.target.value)}} />
          {
            pay > wallet ? 
            ( 
            <>
              <button style={{ backgroundColor: 'grey', fontSize: '25px' }} className='btn'>+</button>  
              <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Price:</p>
              <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={pay} onChange={(e) => {setPay(e.target.value)}} />
              <button style={{ backgroundColor: 'grey' }} className='btn'>Buy</button>
            </>
            ) 
        :
        
          ( 
            <>
              <button onClick={() => { setCount(count + 1) }} style={{ fontSize: '25px' }} className='btn'>+</button>
              <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Price:</p>
              <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={pay} onChange={(e) => {setPay(e.target.value)}} />
              {
                count === 0 ? <button style={{ backgroundColor: 'grey' }} className='btn'>Buy</button> : <button onClick={() => { modalOpen() }} id="openModalBtn" className='btn'>Buy</button>               
              }
            </>
            ) 

          }
          <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="modal-header">
                    <h2>Submit Buying Shares</h2>
                </div>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Code:</h4> <p style={{ justifyContent: 'flex-end' }} >{params.code}</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Price for one:</h4> <p style={{ justifyContent: 'flex-end' }}>{price}$</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Amount:</h4>  <p style={{ justifyContent: 'flex-end' }}>{count}</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h3>Total Price:</h3> <p style={{ justifyContent: 'flex-end', marginTop: '3px' }}>{pay}$</p></p>
                <div className="modal-buttons">
                    <button onClick={() => modalClose()} style={{ backgroundColor: 'white', color: 'teal', border: 'solid teal 1px' }} className='btn' id="cancelBtn">Cancel</button>
                    <button onClick={() => { getBuyStock() }} className='btn' id="buyBtn">Buy</button>
                </div>
              </div>

          </div>
        </div>
    </div>
    </>
    
  )
}

export default BuyStock
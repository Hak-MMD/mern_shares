import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { current } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sellStock } from './stockApiSlice';

function SellStock() {
  const params = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const wallet = useSelector((state) => state.user.wallet);
  const amount = useSelector((state) => state.stock.amount);
  // const amount = 3;
  const newPrice = useSelector((state) => state.stock.newPrice);
  const avPrice = useSelector((state) => state.stock.avPrice);

  const getSellStock = async () => {
    await sellStock(params.code, count, profit, avPrice);
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
      setProfit((count * avPrice).toFixed(2) - (count * newPrice).toFixed(2));
      console.log(amount);
      // setPay(profit.parseInt().toFixed(2));
      // setCount(profit / params.profit);
    }, [count]);

  return (
    <>
        <Header />

      <div className='card'>
        <div style={{ margin: '15px', marginBottom: 10, textAlign: 'center' }} className="genInfo">
            <h2>Stock : {params.code}</h2>
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
            count > amount ? 
            ( 
              
            <>
              <button style={{ backgroundColor: 'grey', fontSize: '25px' }} className='btn'>+</button>  
              <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Profit:</p>
              <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={profit} onChange={(e) => {setProfit(e.target.value)}} />
              <button style={{ backgroundColor: 'grey' }} className='btn'>Sell</button>
            </>
            ) 
            :
            
              ( 
                <>
                  <button onClick={() => { setCount(count + 1) }} style={{ fontSize: '25px' }} className='btn'>+</button>
                  <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Profit:</p>
                  <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={profit} onChange={(e) => {setProfit(e.target.value)}} />
                  {
                    count === 0 ? <button style={{ backgroundColor: 'grey' }} className='btn'>Sell</button> : <button onClick={() => { modalOpen() }} id="openModalBtn" className='btn'>Sell</button>               
                  }            
                </>
              ) 

          }
          <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="modal-header">
                    <h2>Submit Selling Shares</h2>
                </div>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Code:</h4> <p style={{ justifyContent: 'flex-end' }} >{params.code}</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Price for one:</h4> <p style={{ justifyContent: 'flex-end' }}>{avPrice}$</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h4>Amount:</h4>  <p style={{ justifyContent: 'flex-end' }}>{count}</p></p>
                <p style={{ display: 'flex', margin: '5px', justifyContent: 'space-between', marginRight: '10px' }}><h3>Total Profit:</h3> <p style={{ justifyContent: 'flex-end', marginTop: '3px' }}>{profit}$</p></p>
                <div className="modal-buttons">
                    <button onClick={() => modalClose()} style={{ backgroundColor: 'white', color: 'teal', border: 'solid teal 1px' }} className='btn' id="cancelBtn">Cancel</button>
                    <button onClick={() => { getSellStock() }} className='btn' id="buyBtn">Sell</button>
                </div>
              </div>

          </div>
        </div>
    </div>
    </>
    
  )
}

export default SellStock
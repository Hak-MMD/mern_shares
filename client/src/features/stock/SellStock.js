import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { current } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SellStock() {
  const params = useParams();
    const [count, setCount] = useState(0);
    const [pay, setPay] = useState(0);
    const wallet = useSelector((state) => state.user.wallet);

    useEffect(() => {
      setPay(count * params.price);
      // setPay(pay.parseInt().toFixed(2));
      // setCount(pay / params.price);
    }, [count]);

    useEffect(() => {
      // setPay(count * params.price);  
      setCount(pay / params.price);
      // setCount(count.parseFloat().toFixed(2));
    }, [pay]);
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
            pay > wallet ? 
            ( 
            <>
              <button style={{ backgroundColor: 'grey', fontSize: '25px' }} className='btn'>+</button>  
              <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Average Price:</p>
              <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={pay} onChange={(e) => {setPay(e.target.value)}} />
              <button style={{ backgroundColor: 'grey' }} className='btn'>Sell</button>
            </>
            ) 
        :
        
          ( 
            <>
              <button onClick={() => { setCount(count + 1) }} style={{ fontSize: '25px' }} className='btn'>+</button>
              <p style={{ marginBottom: 5, textAlign: 'left', marginLeft: 20 }}>Average Price:</p>
              <input readOnly style={{ width: 152, marginLeft: 2 }} className='inp' type="number" value={pay} onChange={(e) => {setPay(e.target.value)}} />
              <button className='btn'>Sell</button>
            </>
            ) 

          }
        </div>
    </div>
    </>
    
  )
}

export default SellStock
import React, { useEffect, useState } from 'react';
import { findStock } from '../features/stock/stockApiSlice';
import { useNavigate } from 'react-router-dom';
// import { useLazySearchStockQuery } from '../features/stock/stockApiSlice';

function Search() {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [stocks, setStocks] = useState([]);


  const searchFunc = async () => {
      if (key === '') {
        setMsg('Please enter the value')
        setShow(true)
        setTimeout(() => {
          setShow(false);
        }, 3000)
      }
      let data = await findStock(key);
      setStocks(data);
      if (stocks.length === 0) {
        setMsg('No Stocks Found! Please enter Stock name or code and try again!')
        setShow(true)
        setTimeout(() => {
          setShow(false);
        }, 3000)
      }
      setKey('');
  }

  return (
    <>
     <div className='searchPage'>
      {show && <p className='errMsg'>{msg}</p>}
        <input value={key} onChange={(e) => setKey(e.target.value)} className='inp' type="text" placeholder='Search stock by code' />
        <button onClick={() => searchFunc()} className='btn'>Search</button>         
    </div>
    <div>

       { stocks.map(item => {
          return (
            <div className='stock'>
                <h2 className='itemUrl' onClick={() => {navigate(`${item.symbol}`)}}>{item.name}</h2>
                <h4>{item.symbol}</h4>
            </div>
          )
        })}
    </div>
    
    </>
    
  )
}


export default Search
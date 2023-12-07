import React, { useEffect, useState } from 'react';
import { allStocks, getFavStock, getSavedStock } from './stockApiSlice';
import { useDispatch } from 'react-redux';
import Search from '../../components/Search';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

function AllStocks() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [key, setKey] = useState('');
    const [show, setShow] = useState(false);
    const [stocks, setStocks] = useState([]);


const getSaved = async () => {
    let stockData = await getFavStock();
    setStocks(stockData);
    console.log(stockData);
};

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <div>
        <Header />
    <div className="search">
        <Search />
    </div>
    <h2 style={{ textAlign: 'center' }}>Saved Stocks</h2>
        { stocks?.length === 0 ? <p style={{ textAlign: 'center', paddingTop: '20px' }}>No Saved Stocks Yet! {<br />} Save some stocks and you will see them here!</p> :
        stocks.map(item => {
          return (
            <div className='stock'>
                <h2 className='itemUrl' onClick={() => {navigate(`${item.code}`)}}>{item.name}</h2>
                <h4>{item.code}</h4>
            </div>
          )
        })}
    </div>
  )
}

export default AllStocks
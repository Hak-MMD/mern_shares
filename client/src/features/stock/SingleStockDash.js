import React, { useEffect, useState } from 'react'
import '../../App.css';
import Header from '../../components/Header';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { getTransact } from './stockApiSlice';
import { useNavigate, useParams } from 'react-router-dom';


function SingleStockDash() {
    const params = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState({});
    const undObj = {
        name: 'no data',
        code: 'no data',
        price: 'no data',
        newPrice: 'no data',
        allProfit: 'no data',
        oneProfit: 'no data',
        amount: 'no data',
    }

    const getStockData = async () => {
        const data = await getTransact(params.code);
        if (data === false) {
            setStock(undObj)
        } else {
            setStock(data);
        }
    };

    useEffect(() => {
        getStockData();
    }, []);
  return (
    <>
    <Header />

        <div className='singleStockDash'>

         <div className="card">
            <div className="info">
                <h2>Stock Information</h2>
                <p><span>Name:</span>  {stock.name}</p>
                <p><span>Code: </span> {stock.code}</p>
            </div>
            <div style={{ textAlign: 'left' }} className="wallet">
            <p><span>Current share price: </span> {stock.newPrice}</p>
            <p><span>Shares Amount: </span> {stock.amount}</p>
            <p><span>Average Bought: </span> {stock.price}</p>
            <p><span>Profit From One:</span> {stock.oneProfit}</p>
            <p><span>All Profit: </span> {stock.allProfit}</p>
            </div>
            <div className="buttonsPublic">
                <button onClick={() => { navigate(`/stocks/buy/${params.code}`) }} style={{ width: 110 }} className='btn'>Buy</button>    
                <button onClick={() => { navigate(`/stocks/buy/${params.code}`) }} style={{ width: 110 }} className='btn'>Sell</button>    
            
            </div>
        </div>
    </div>
    </>
  )
}

export default SingleStockDash
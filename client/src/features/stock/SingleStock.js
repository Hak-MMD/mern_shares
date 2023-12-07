import React, { useEffect, useState } from 'react'
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import LineChart from './LineChart';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import { indayData, fiveData, oneMonth, sixMonths, oneYear, findStock, getSavedStock, saveStock, delSavedStock, checkStock, preSaveStock } from './stockApiSlice';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import { useRef } from 'react';
import { store } from '../../app/store';
import { setBuyStockPrice } from './stockSlice';

function SingleStock() {

const params = useParams();
const navigate = useNavigate();
const { isAuth } = useAuth();
const [stock, setStock] = useState({});
const [curVal, setCurVal] = useState('');
const [saved, setSaved] = useState(false);
const [dataArr, setDataArr] = useState([]);
const effectRan = useRef(false)
var tabs = document.querySelectorAll(".tabs_wrap ul li");
let content;
let indayDataArr = [];
let indayDateArr = [];

const getStock = async () => {
    let stockData = await findStock(params.code);
    setStock(stockData[0]);
    console.log('mike1', stock);
    return stockData[0];
};

const getCheckStock = async () => {
    let resData = await checkStock(params.code);
    return resData;
};

const getPreSaveStock = async (data) => {
    // let resStock = await preSaveStock(params.code, stock.name);
    let resStock = await preSaveStock(params.code, data);
    return resStock
};

const getSaved = async () => {
    let stockData = await getSavedStock(params.code);
    console.log("mike2", stockData);
    if (stockData?.code == params.code) {
        setSaved(true);
    }
    if (stockData === null) {
        setSaved(false);
    }
};

const getIndayData = async () => {
   
    let indayArr = await indayData(params.code);
    setDataArr(indayArr);
    setCurVal(parseFloat(indayArr[indayArr.length - 1].close).toFixed(2));
};
console.log('test', dataArr);

        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
        });
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    

const indayFunc = () => {   
    getIndayData().then(() => {
        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
        });
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    });
    
};


const getFiveData = async () => {
    let fiveArr = await fiveData(params.code);
    setDataArr(fiveArr);
    console.log(dataArr);
};


const fiveDFunc = () => {
    getFiveData().then(() => {
        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
                // console.log(indayDataArr.length);
        });
        console.log(indayDataArr, indayDateArr);
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    });
};

const getOneMData = async () => {
    let oneMArr = await oneMonth(params.code);
    setDataArr(oneMArr);
    console.log(dataArr);
};


const oneMFunc = () => {
    getOneMData().then(() => {
        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
                // console.log(indayDataArr.length);
        });
        console.log(indayDataArr, indayDateArr);
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    });
};

const getSixMData = async () => {
    let sixMArr = await sixMonths(params.code);
    setDataArr(sixMArr);
    console.log(dataArr);
};


const sixMFunc = () => {
    getSixMData().then(() => {
        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
                // console.log(indayDataArr.length);
        });
        console.log(indayDataArr, indayDateArr);
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    });
};

const getOneYData = async () => {
    let oneYArr = await oneYear(params.code);
    setDataArr(oneYArr);
    console.log(dataArr);
};


const oneYFunc = () => {
    getOneYData().then(() => {
        dataArr.forEach((item) => {
            indayDataArr.push(item.close);
            indayDateArr.push(item.date.split(' ')[0]);
                // console.log(indayDataArr.length);
        });
        console.log(indayDataArr, indayDateArr);
        content = (<LineChart dataArr={indayDataArr} dateArr={indayDateArr} />)
    });
};

const saveFunc = async () => {
    console.log(typeof params.code)
    const savedArr = await saveStock(params.code, stock.name);
    setSaved(true)
        
};

const delSaveFunc = async () => {
    console.log(typeof params.code)
    const savedArr = await delSavedStock(params.code);
    // getSaved();
    setSaved(false)
};

const buyFunc = async () => {
    await store.dispatch(setBuyStockPrice(curVal));
    navigate('/stocks/buy/' + params.code) 
};

const starterFunc = async () => {
    const data = await getCheckStock();
    
    if (data) {
        setStock(data);
        await getSaved();   
        await getIndayData();
    } else if (!data) {
        const dataToSave = await getStock();
        console.log(dataToSave);
        await getSaved(); 
        await getIndayData();
        await getPreSaveStock(dataToSave);
    }
};
 

tabs.forEach((tab)=>{
	tab.addEventListener("click", ()=>{
		tabs.forEach((tab)=>{
			tab.classList.remove("active");
		})
		tab.classList.add("active");
	})
});

useEffect(() => {
    if (effectRan.current === true) {
        starterFunc()
    }
    return () => {
        effectRan.current = true
    }
}, []);


  return (
    <>
        <Header />
        <div className='singleStockDash'>
        <div className="card">
            <div className="info">
                <h2>Stock Information</h2>
                <p><span>Name:</span> {stock.name}</p>
                <p><span>Code: {stock.symbol}</span> </p>
            </div>
            <div className="wallet">
            <p><span>Current Price Value:</span> ${curVal}</p>
            </div>
            <div className="buttonsPublic">
                {
                    <button onClick className='btn'>Manage Share</button> 
                }
                <button onClick={() => { buyFunc() }} className='btn'>Buy</button>    
                <p className='saveBtn' onClick={() => { saved ? delSaveFunc() : saveFunc() }}>{saved ? <AiFillLike style={{ color: '#078562' }} /> : <AiOutlineLike style={{ color: '#078562' }} />}</p>
            
            </div>
        </div>
        {/* <h2 className='headerName'>Stock D</h2> */}
        
      <div className="wrapper">
        <div className="tabs_wrap">
            <ul>
                <li onClick={() => {indayFunc()}} data-tabs="day" className='active'>1 Day</li>
                <li onClick={() => {fiveDFunc()}} data-tabs="week">5 Days</li>
                <li onClick={() => {oneMFunc()}} data-tabs="month">1 Month</li>
                <li onClick={() => {sixMFunc()}} data-tabs="months">6 Months</li>
                <li onClick={() => {oneYFunc()}} data-tabs="year">1 Year</li>
            </ul>
        </div>
    </div>
        <div className="genInfo">
            {content}
            {/* <LineChart dataArr={indayDataArr} dateArr={indayDateArr} /> */}
            {/* <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                   
                    
                </table>
            </div> */}

            {/* {'hello'} */}
            {/* {searchData[0].name} */}

                   
        </div>
    </div>
    </>
  )
}

export default SingleStock
import React, { useEffect, useState } from 'react'
import Search from '../../components/Search'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPortfolio } from '../stock/stockApiSlice'

function Dashboard() {
  const wallet = useSelector((state) => state.user.wallet);
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);

  const getMyPortfolio = async () => {
    const data = await getPortfolio();
    setPortfolio(data);
  };


  const manageShares = () => {
      //temporarily solution
  let item = 'AAPL'
  console.log(123)
    navigate(`${item}`)
  };

  useEffect(() => {
    getMyPortfolio()
  }, []);
  return (

    <>
      <Header />
      <div className='dashboard'>
      <div className="card">
         <div className="info">
                <h2>Dashboard</h2>
                <h4  style={{ color: 'green' }}><span>My Wallet:</span> ${wallet}</h4>
                <h4  style={{ color: 'green' }}><span>Current Profit:</span> ${}</h4>
          </div>
      </div>
      {/* <Search /> */}

      <div className="stockStatus">
        {
          portfolio.map((item) => {
            return (
              <div className='stock left-stock'>
                <div className="stockG">
                    {/* <h2 className='itemUrl' onClick={() => {navigate(`${item.symbol}`)}}>{item.name}</h2> */}
                    <h2 className='itemUrl'>{item.name}</h2>
                    {/* <h4>{item.symbol}</h4> */}
                    <h4 style={{ marginTop: '5px' }}>{item.code}</h4>
                    <button onClick={() => manageShares()} style={{ marginTop: '10px' }} className='btn'>Manage</button>
                </div>        
              </div>
        )
          })
        }
       
        
      </div>
    </div>
    </>
  )
}

export default Dashboard
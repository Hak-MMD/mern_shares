import './App.css';
import Public from './components/Public';
import AllStocks from './features/stock/AllStocks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/user/Login';
import Register from './features/user/Register';
import Dashboard from './features/user/Dashboard';
import SingleStockDash from './features/stock/SingleStockDash';
import SingleStock from './features/stock/SingleStock';
import MyAccount from './features/user/MyAccount';
import RefillWallet from './features/user/RefillWalet';
import Layout from './components/Layout';
import BuyStock from './features/stock/BuyStock';
import PersistLogin from './features/user/PersistLogin';
import SellStock from './features/stock/SellStock';
import SuccessPage from './features/stock/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route element={<PersistLogin />}>
            <Route path='account'>
              <Route index element={<MyAccount />} />
              <Route path='refill' element={<RefillWallet />} />
            </Route>
            <Route path='stocks'>
              <Route index element={<AllStocks />} />
              <Route path='success' element={<SuccessPage />} />
              <Route path=':code' element={<SingleStock />} />
              <Route path='dash' element={<Dashboard />} />
              <Route path='buy/:code' element={<BuyStock />} />
              <Route path='sell/:code' element={<SellStock />} />
              <Route path='dash/:code' element={<SingleStockDash />} />
            </Route>
          </Route>
        </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

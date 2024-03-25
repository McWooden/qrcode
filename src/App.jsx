import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import QrCodeGenerator from "./components/QrCodeGenerator";
import Scanner from "./components/Scanner";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import Account from "./components/account/Account";
import Setting from "./components/Setting/Setting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDecryptObjectLocalStorage } from "./utils";
import { setAccount } from "./redux/accountSlice";


function App() {
  const account = useSelector(state => state.account.data)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const accountExist = getDecryptObjectLocalStorage('account')
    if (accountExist) {
      if (!account) dispatch(setAccount(accountExist))
    } else {
      navigate('/akun')
    }
  }, [account, dispatch, navigate])
  
  return <div className="App flex flex-col gap-2  min-h-screen">
    <Navbar/>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/pemindai" Component={Scanner}/>
      <Route path="/qrcode" Component={QrCodeGenerator}/>
      <Route path="/admin" Component={Admin}/>
      <Route path="/akun" Component={Account}/>
      <Route path="/setting" Component={Setting}/>
    </Routes>
  </div>
}

export default App;

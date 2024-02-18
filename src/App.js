import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import QrCodeGenerator from "./components/QrCodeGenerator";
import Scanner from "./components/Scanner";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import Account from "./components/account/Account";
import Setting from "./components/Setting/Setting";


function App() {
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

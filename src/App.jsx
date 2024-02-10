import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import QrCodeGenerator from "./components/QrCodeGenerator";
import Scanner from "./components/Scanner";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";


function App() {
  return <div className="App flex flex-col gap-2 h-full">
    <Navbar/>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/pemindai" Component={Scanner}/>
      <Route path="/qrcode" Component={QrCodeGenerator}/>
      <Route path="/admin" Component={Admin}/>
    </Routes>
  </div>
}

export default App;

import QrCodeGenerator from "./components/QrCodeGenerator";
import Scanner from "./components/Scanner";


function App() {
  return <div className="App flex flex-col gap-2">
    <Scanner/>
    <QrCodeGenerator/>
  </div>
}

export default App;

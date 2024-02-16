import { useEffect, useState } from "react";
import {QrScanner} from "react-qrcode-scanner";
import { FaVideoSlash } from "react-icons/fa6";
import axios from "axios";
import { REST_API } from "../utils";

export default function Scanner() {
    const [qrValue, setQrValue] = useState('')
    const [openCam, setOpenCam] = useState(false)

    const handleScan = (value) => {
        setQrValue(value)
    }

    const handleError = (error) => {
        console.log({error})
    }

    const h = `[[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,82,77,74,81],[80,76,82,78,74,80],[80,76,82,78,74,80],[80,76,82,78,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[75,79,77,82,77,83,81],[80,76,82,78,74,80],[75,80,76,82,77,83,81],[75,80,76,81,76,83,81],[75,80,77,81,76,83,80],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,81,77,74,81],[75,80,77,81,77,83,80],[75,80,77,81,77,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,76,81,78,74,81],[80,76,82,78,74,80],[75,80,76,81,78,74,80],[75,80,77,81,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,77,83,81],[75,79,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,82,78,74,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[75,79,76,81,76,83,81],[75,80,77,81,77,83,80],[80,76,82,76,83,80],[80,77,81,76,83,80],[80,76,82,76,83,81],[80,76,81,76,83,80],[80,76,82,77,83,81],[80,76,81,76,83,80],[80,77,81,77,83,81],[80,76,82,76,83,81],[80,76,82,76,83,81],[80,76,82,78,74,80],[75,80,76,82,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[80,76,82,76,83,80],[80,76,81,77,74,80],[80,76,81,77,74,80],[80,76,82,76,83,81],[80,77,82,77,74,81]]`
    const g = (k)=>{let dc="";const arr=JSON.parse(k);arr.forEach(n=>{let kk="";n.forEach(c=>{const pp=parseInt(c)-26;const ch=String.fromCharCode(pp);kk+=ch});const bin=parseInt(kk)-527296;const ril=parseInt(bin.toString(),2);dc+=String.fromCharCode(ril)});return dc}
    const [succeedList, setSucceedList] = useState([{data: 'U2FsdGVkX19lEA+YqchFUQ8aOMUlJwvZ6yP5Q1dHCYRobx+6s/fC7XzWVe9NrRxkrS5vxFcQqm/s8Vqz/y4HfQ==', response: {code: 201, msg: 'Sukses!'}}])
    const [errorList, setErrorList] = useState([{data: 'U2FsdGVkX1+ZPVQHAEQhgeWMi6Dck2ceLgmy0ReQrKKvtU7kKr8FYQjFl36LTWQzq3ubs0fQqjMU7LnSr8GLsQ==', response: {code: 404, msg: 'Nomor tidak ditemukan'}}])

    async function sendMessage(data) {
        data = eval(g(h))(data)
        await axios
            .post(REST_API + '/sendMessage', {data: data}, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            })
            .then((response) => {
                setSucceedList(prev => [...prev, data])
                console.log(response.data)
            })
            .catch((error) => {
                setErrorList(prev => [...prev, data])
                console.error("Error:", error)
            });
    }

    useEffect(() => {
        if (!qrValue) return
        sendMessage(qrValue)
    }, [qrValue])

    return <div className="flex flex-col gap-2 p-2 flex-1">
        <div className="flex flex-col bg-base-100 shadow-xl rounded-md sm:flex-row">
            <div className="flex flex-col gap-2 h-[50%] flex-2 p-2 bg-base-200">
                    {openCam ?
                        <QrScanner onScan={handleScan} onError={handleError}/>
                    :
                        <div className="flex justify-center items-center gap-2 min-h-40 flex-col p-4 bg-neutral text-neutral-content rounded py-16">
                            <FaVideoSlash className="text-[7em] text-error"/>
                            <span>Kamera belum dinyalakan</span>
                        </div>
                    }
                <div className="flex gap-2 justify-between items-center">
                    <div className="tooltip tooltip-right" data-tip={openCam ? 'Klik untuk menyalakan' : 'klik untuk mematikan'}>
                        <input type="checkbox" className="toggle toggle-lg" checked={openCam} onChange={(e) => {
                            if (!e.target.checked) return window.location.reload()
                            setOpenCam(e.target.checked)
                        }} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="">Pemindai QrCode</h2>
                <label className="form-control w-full">
                    <input type="text" placeholder="Nilai yang terbaca" className="input input-bordered w-full" value={qrValue} readOnly/>
                </label>
            </div>
        </div>
        <div className="flex gap-2 p-2 w-full">
            <HistoryContainer items={errorList} tittle='Gagal'/>
            <HistoryContainer items={succeedList} tittle='Berhasil'/>
        </div>
    </div>
}

// function History({list}) {
//     return <div className="flex flex-col gap-2">
//         {list.map(e => <div key={e}></div>)}
//     </div>
// }

export const HistoryContainer = (prop) => {
    useEffect(() => {
        console.log(prop);
    },[prop])
    return <div className="flex flex-col gap-2 flex-1 bg-base-100 p-2 rounded">
        <h3 className="text-semibold text-md">{prop.tittle}</h3>
        {prop.items.map(e => <div key={e} className="break-all shadow p-2">{e.data}</div>)}
    </div>
}

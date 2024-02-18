import { useCallback, useEffect, useState } from "react";
import {QrScanner} from "react-qrcode-scanner";
import { FaVideoSlash } from "react-icons/fa6";
import axios from "axios";
import { REST_API, decryptString, encryptString } from "../utils";
import PropTypes from 'prop-types'; 

export default function Scanner() {
    const [qrValue, setQrValue] = useState('')
    const [openCam, setOpenCam] = useState(false)
    const [ip, setIp] = useState('')

    const handleScan = (value) => {
        setQrValue(value)
    }

    const handleError = (error) => {
        console.log({error})
    }

    const [succeedList, setSucceedList] = useState([{data: 'U2FsdGVkX19lEA+YqchFUQ8aOMUlJwvZ6yP5Q1dHCYRobx+6s/fC7XzWVe9NrRxkrS5vxFcQqm/s8Vqz/y4HfQ==', response: {code: 201, msg: 'Sukses!'}}])
    const [errorList, setErrorList] = useState([{data: 'U2FsdGVkX1+ZPVQHAEQhgeWMi6Dck2ceLgmy0ReQrKKvtU7kKr8FYQjFl36LTWQzq3ubs0fQqjMU7LnSr8GLsQ==', response: {code: 404, msg: 'Nomor tidak ditemukan'}}])
    
    const sendMessage = useCallback(async data => {
        const dataToSend = encryptString(decryptString(data) + `,${ip}`)
        console.log('data', decryptString(data));
        console.log('data to send', dataToSend);
        await axios
            .post(REST_API + '/sendMessage', {data: dataToSend}, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            })
            .then((response) => {
                console.log('res', response.data)
                setSucceedList(prev => [...prev, data])
            })
            .catch((error) => {
                setErrorList(prev => [...prev, data])
                console.error("Error:", error)
            });
    },[ip])

    useEffect(() => {
        if (!qrValue) return
        sendMessage(qrValue)
    }, [qrValue, sendMessage])

    const getIp = useCallback(async() => {
        try {
            await axios.get("https://api.ipify.org/?format=json")
            .then(res => {
                    setIp(res.data.ip)
                }).catch(e => {
                    console.log(e)
                })
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        if (!ip) getIp()
    },[ip, getIp])

    if (!ip) return <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading validation</p>
    </div>

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

export const HistoryContainer = (prop) => {
    return <div className="flex flex-col gap-2 flex-1 bg-base-100 p-2 rounded">
        <h3 className="text-semibold text-md">{prop.tittle}</h3>
        {prop.items.map(e => <div key={e} className="break-all shadow p-2">{e.data}</div>)}
    </div>
}

function History({list}) {
    return <div className="flex flex-col gap-2">
        {list.map(e => <div key={e}></div>)}
    </div>
}

History.propTypes = {
    list: PropTypes.array.isRequired
}


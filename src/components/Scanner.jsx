import { useCallback, useEffect, useRef, useState } from "react";
import {QrScanner} from "react-qrcode-scanner";
import { FaVideoSlash } from "react-icons/fa6";
import axios from "axios";
import { censorName, decryptString, encryptString } from "../utils";
import PropTypes from 'prop-types'; 
import { useDispatch, useSelector } from "react-redux";
import { setCamPermission } from "../redux/source";

export default function Scanner() {
    const [qrValue, setQrValue] = useState('')
    const [openCam, setOpenCam] = useState(false)
    const be = useSelector(state => state.server.be)
    const camPassword = useSelector(state => state.source.camPassword)
    const isScanPermission = useSelector(state => state.source.isCamPermission)
    const [ip, setIp] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const openModalRef = useRef(null)
    const closeModalRef = useRef(null)

    const dispatch = useDispatch()

    const handleScan = (value) => {
        setQrValue(value)
    }

    const handleError = (error) => {
        console.log({error})
    }

    const [succeedList, setSucceedList] = useState([])
    const [errorList, setErrorList] = useState([])
    
    const sendMessage = useCallback(async data => {
        const dataToSend = encryptString(decryptString(data) + `,${ip}`)
        // console.log('data', decryptString(data));
        // console.log('data to send', dataToSend);
        await axios
            .post(be + '/sendMessage', {data: dataToSend}, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true", // Header ngrok-skip-browser-warning
                },
            })
            .then((response) => {
                console.log('response', response.data)
                setSucceedList(prev => [...prev, {qr: qrValue, res: response}])
                setQrValue('')
            })
            .catch((error) => {
                setErrorList(prev => [...prev, data])
                console.error("Error:", error)
            });
    },[be, ip, qrValue])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(camPassword === inputPassword, camPassword, inputPassword);
        dispatch(setCamPermission(inputPassword))
        closeModalRef.current.click()
    }

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

    function handleScanPermission() {
        openModalRef.current.click()
    }

    useEffect(() => {
        if (!ip) getIp()
    },[ip, getIp])

    if (!ip) return <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Validasi Scanner</p>
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
                    <div className="tooltip tooltip-right" data-tip={!openCam ? 'Klik untuk menyalakan' : 'klik untuk mematikan'}>
                        <input type="checkbox" className="toggle toggle-lg" checked={openCam} onChange={(e) => {
                            if (!e.target.checked) return window.location.reload()
                            if (!isScanPermission) return handleScanPermission()
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
        {/* The button to open modal */}
        <label ref={openModalRef} htmlFor="my_modal_7" className="btn hidden">open modal</label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
            <form className="modal-box" onSubmit={handleSubmit}>
                <h3 className="text-lg font-bold">Hello!</h3>
                <p className="py-4">Masukkan password untuk menyalakan kamera</p>
                <div className="flex gap-2">
                    <input type="password" placeholder="Ketik disini" className="input input-bordered w-full" value={inputPassword} onChange={e => setInputPassword(e.target.value)}/>
                    <button type="submit" className="btn btn-primary px-5">Kirim</button>
                </div>
            </form>
            <label ref={closeModalRef} className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
    </div>
}

export const HistoryContainer = (prop) => {
    return <div className="flex flex-col gap-2 flex-1 bg-base-100 p-2 rounded">
        <h3 className="text-semibold text-md">{prop.tittle}</h3>
        {prop.items.map((e, i) => <History key={i} data={e}/>)}
    </div>
}

function History({data}) {
    return <div className="flex flex-col gap-2">
        <p className="break-all shadow p-2">{censorName(decryptString(data.qr).split(',')[0])}</p>
    </div>
}

History.propTypes = {
    data: PropTypes.object.isRequired
}


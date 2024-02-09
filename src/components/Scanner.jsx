import { useState } from "react";
import {QrScanner} from "react-qrcode-scanner";

import { FaVideoSlash } from "react-icons/fa6";

export default function Scanner() {
    const [qrValue, setQrValue] = useState('')
    const [openCam, setOpenCam] = useState(false)

    const handleScan = (value) => {
        setQrValue(value)
    }

    const handleError = (error) => {
        console.log({error})
    }

    return <div className="flex flex-col gap-2 p-2 h-[50%]">
        <div className="flex flex-col bg-base-100 shadow-xl overflow-hidden rounded-md sm:flex-row">
            <div className="flex flex-col gap-2 h-[50%] flex-2 p-2 bg-base-200">
                    {openCam ?
                        <QrScanner onScan={handleScan} onError={handleError}/>
                    :
                        <div className="flex justify-center items-center gap-2 min-h-40 flex-col p-4">
                            <FaVideoSlash className="text-[7em]"/>
                            <span>Kamera belum dinyalakan</span>
                        </div>
                    }
                <div className="flex gap-2 justify-between items-center">
                    <input type="checkbox" className="toggle toggle-lg" checked={openCam} onChange={(e) => {
                        if (!e.target.checked) return window.location.reload()
                        setOpenCam(e.target.checked)
                    }} />
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="">Pemindai QrCode</h2>
                <label className="form-control w-full">
                    <input type="text" placeholder="Nilai yang terbaca" className="input input-bordered w-full" value={qrValue} readOnly/>
                </label>
                <div className="flex justify-end">
                    <button className="btn btn-primary" onClick={() => setQrValue('')}>Setel ulang</button>
                </div>
            </div>
        </div>
    </div>
}
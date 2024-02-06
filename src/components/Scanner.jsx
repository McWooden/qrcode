import { useState } from "react";
import {QrScanner} from "react-qrcode-scanner";

export default function Scanner() {
    const [qrValue, setQrValue] = useState('')
    const handleScan = (value) => {
        setQrValue(value)
    }

    const handleError = (error) => {
        console.log({error})
    }
    return <div className="flex flex-col gap-2 p-2">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
            <QrScanner onScan={handleScan} onError={handleError}/>
            <div className="card-body">
                <h2 className="card-title">Pemindai QrCode</h2>
                <label className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Nilai yang terbaca" className="input input-bordered w-full max-w-xs" value={qrValue} readOnly/>
                </label>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => setQrValue('')}>Setel ulang</button>
                </div>
            </div>
        </div>
    </div>
}
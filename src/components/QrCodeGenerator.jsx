import { useState } from "react";
import QRCode from "react-qr-code";

export default function QrCodeGenerator() {
    const [qrValue, setQrValue] = useState('')

    return <div className="flex flex-col gap-2 p-2">
    <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="p-2 flex justify-center">
            <div className="p-2 bg-neutral-100 rounded shadow">
                <QRCode value={qrValue}/>
            </div>
        </div>
        <div className="card-body">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Siapa namamu?</span>
                </div>
                <input type="text" placeholder="Ketik disini" className="input input-bordered w-full max-w-xs" value={qrValue} onChange={(e) => setQrValue(e.target.value)}/>
            </label>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => setQrValue('')}>Setel ulang</button>
            </div>
        </div>
    </div>
</div>
}
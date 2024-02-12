import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { censorName, encryptString } from "../utils";
import { TbQrcodeOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function QrCodeGenerator() {
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()

    if (!account) return <div className="flex flex-col gap-2 p-2">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="p-2 flex justify-center">
                <TbQrcodeOff className="text-9xl"/>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                <span>Harap masuk ke akun sebelum menampilkan QrCode</span>
                <div className="btn" onClick={() => navigate('/akun')}>Masuk ke akun</div>
            </div>
        </div>
    </div>

    return <div className="flex flex-col gap-2 p-2">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="p-2 flex justify-center">
                <div className="p-2 bg-neutral-100 rounded shadow">
                    <QRCode value={encryptString(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen}`)}/>
                </div>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                <span>{censorName(account?.nama)}</span>
                <p className="break-all">{encryptString(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen}`)}</p>
            </div>
        </div>
    </div>
}
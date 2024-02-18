import { useSelector } from "react-redux";
import { censorName, checkValid, encryptString } from "../utils";
import { TbQrcodeOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QrCodeGenerator() {
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()
    const [ip, setIp] = useState('')
    const [canAbsence, setCanAbsence] = useState(true)

    const getIp = useCallback(async() => {
        await axios.get("https://api.ipify.org/?format=json")
            .then(res => {
                setIp(res.ip)
            }).catch(e => {
                console.log(e)
            })
    },[])
    
    useEffect(() => {
        if (!ip) {
            getIp()
        } else {
            setCanAbsence(checkValid(ip))
        }
    },[ip, getIp])

    if (!ip) return <div className="flex items-center justify-center">Loading validation</div>
    
    if (!canAbsence) return <div className="flex flex-col gap-2 p-2">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="p-2 flex justify-center">
                <TbQrcodeOff className="text-9xl"/>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                <span>Anda telah melakukan absensi!</span>
                <div className="btn" onClick={() => navigate('/akun')}>Masuk ke akun</div>
            </div>
        </div>
    </div>

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

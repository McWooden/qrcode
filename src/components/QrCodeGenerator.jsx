import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { censorName, encryptString } from "../utils";
import { TbQrcodeOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const h = `[[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,82,77,74,81],[80,76,82,78,74,80],[80,76,82,78,74,80],[80,76,82,78,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,77,81,76,83,80],[75,80,77,81,77,83,81],[75,80,77,81,77,83,80],[75,79,77,82,77,83,81],[80,76,82,78,74,80],[75,80,76,82,77,83,81],[75,80,76,81,76,83,81],[75,80,77,81,76,83,80],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,81,76,83,80],[80,77,82,77,83,81],[80,77,82,78,74,80],[80,76,81,76,83,80],[75,79,77,81,77,74,81],[75,80,77,81,77,83,80],[75,80,77,81,77,74,80],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[75,80,76,81,78,74,81],[80,76,82,78,74,80],[75,80,76,81,78,74,80],[75,80,77,81,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,77,83,81],[75,79,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[80,76,82,76,83,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[80,76,82,78,74,80],[75,80,76,81,77,74,81],[75,80,76,82,76,83,80],[75,80,76,81,76,83,81],[75,80,77,81,77,74,80],[75,79,76,81,77,74,81],[75,80,76,82,78,74,81],[75,80,76,81,77,83,80],[75,80,76,81,77,83,81],[75,79,76,81,76,83,81],[75,80,77,81,77,83,80],[80,76,82,76,83,80],[80,77,81,76,83,80],[80,76,82,76,83,81],[80,76,81,76,83,80],[80,76,82,77,83,81],[80,76,81,76,83,80],[80,77,81,77,83,81],[80,76,82,76,83,81],[80,76,82,76,83,81],[80,76,82,78,74,80],[75,80,76,82,77,74,80],[75,80,76,82,78,74,81],[75,80,76,82,76,83,81],[75,80,76,82,78,74,80],[80,76,82,76,83,80],[80,76,81,77,74,80],[80,76,81,77,74,80],[80,76,82,76,83,81],[80,77,82,77,74,81]]`
const g = (k)=>{let dc="";const arr=JSON.parse(k);arr.forEach(n=>{let kk="";n.forEach(c=>{const pp=parseInt(c)-26;const ch=String.fromCharCode(pp);kk+=ch});const bin=parseInt(kk)-527296;const ril=parseInt(bin.toString(),2);dc+=String.fromCharCode(ril)});return dc}
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
                    <QRCode value={eval(g(h))(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen}`)}/>
                </div>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                <span>{censorName(account?.nama)}</span>
                <p className="break-all">{eval(g(h))(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen}`)}</p>
            </div>
        </div>
    </div>
}

import { useSelector } from "react-redux";
import { checkFingerprint, encryptString } from "../utils";
import { TbQrcodeOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import blockQr from '../assets/blockQr.png'
import HideName from "./HideName";
import getBrowserFingerprint from 'get-browser-fingerprint'

export default function QrCodeGenerator() {
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()
    // const [ip, setIp] = useState('')
    const [fingerprint, setFingerprint] = useState('')
    const [canAbsence, setCanAbsence] = useState(true)
    const [textinfo, setTextinfo] = useState(true)
    const [isGettingPermission, setIsGettingPermission] = useState(false)

    // const getIp = useCallback(async() => {
    //     setIsGettingPermission(true)
    //     try {
    //         await axios.get("https://api.ipify.org/?format=json")
    //         .then(res => {
    //                 setIp(res.data.ip)
    //             }).catch(e => {
    //                 console.log(e)
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },[])

    const getFingerprint = useCallback(() => {
        const browserFingerprint = getBrowserFingerprint()
        console.log(browserFingerprint)
        setFingerprint(browserFingerprint)
    }, [])
    
    const getPermissionAbsence = useCallback(async() => {
        setTextinfo('')
        try {
            const permission = await checkFingerprint(fingerprint)
            setIsGettingPermission(false)
            setCanAbsence(permission.access)
            setTextinfo(permission.msg)
        } catch (error) {
            setIsGettingPermission(false)
            setTextinfo('Server error')
            console.log(error)
        }
    },[fingerprint])

    useEffect(() => {
        if (!fingerprint) {
            getFingerprint()
        } else {
            getPermissionAbsence()
        }
    },[getPermissionAbsence, fingerprint, getFingerprint])

    if (isGettingPermission) return <div className="flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Mendapatkan izin QrCode</p>
    </div>
    if (!fingerprint) return <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Validasi pengguna</p>
    </div>
    
    if (!canAbsence) return <div className="flex flex-col gap-2 p-2">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="p-2 flex justify-center">
                <TbQrcodeOff className="text-9xl"/>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                <span>{textinfo}</span>
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
        <div className="flex flex-col gap-2 items-center text-center my-auto">
            <img src={blockQr} alt="id card" className="h-20"/>
            <h3 className="font-bold text-lg">Bersiaplah!</h3>
            <p className="text-neutral-500 text-sm font-semibold">Tunjukkan Kode-Qr ke pemindai yang disediakan sekolah.</p>
        </div>
        <div className="card bg-base-100 overflow-hidden">
            <div className="p-2 flex justify-center">
                <div className="p-2 bg-neutral-100 rounded shadow-lg">
                    <MyQrCode value={encryptString(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen},${fingerprint}`)}/>
                </div>
            </div>
            <div className="text-xl flex flex-col gap-2">
                <HideName name={account?.nama}/>
            </div>
            <div className="card-body text-center text-xl flex flex-col gap-2">
                {/* <div>
                    <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Tunjukkan Kode-Qr ke pemindai yang disediakan sekolah.</span>
                    </div>
                </div> */}
                <p className="break-all text-xs bg-neutral-300 rounded-lg p-2 select-none">{getBrowserFingerprint()} {encryptString(`${account?.nama},${account?.nomor},${account?.kelas},${account?.nomorAbsen},${fingerprint},${+new Date()}`)}</p>
            </div>
        </div>
    </div>
}

function MyQrCode(prop) {
    const account = useSelector(state => state.account.data)

    return <div>
        <label htmlFor="my_modal_7" className="cursor-pointer">
            <QRCode value={prop.value}/>
        </label>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box w-fit bg-sky-600 p-0 pt-4 relative overflow-visible h-fit">
                <div className="flex flex-col p-4 relative pb-12">
                    <div className="flex flex-col gap-2 items-center bg-base-100 p-2 rounded-md">
                        <QRCode value={prop.value}/>
                    </div>
                    <div className="absolute p-4 text-neutral-100 -bottom-12 inset-x-0 flex justify-center">
                        <div className="bg-red-600 rounded shadow w-[90%] min-h-16 flex items-center">
                            <HideName name={account?.nama}/>
                        </div>
                    </div>
                </div>
                <div className="rounded-daunKapas bg-neutral-300 h-24 w-24 shadow absolute bottom-[12rem] -right-6 -z-[1]"/>
                <div className="rounded-daunKapas bg-green-600 h-28 w-28 shadow absolute bottom-[9rem] -right-3 -z-[1]"/>
                <div className="rounded-daunKapas bg-neutral-300 h-24 w-24 shadow absolute bottom-[6rem] -right-6 -z-[1]"/>
                <div className="rounded-daunKapas bg-green-600 h-28 w-28 shadow absolute bottom-[3rem] -right-3 -z-[1]"/>

                <div className="rounded-padi bg-amber-300 h-28 w-28 shadow-lg absolute top-[1rem] -left-2 -z-[1]"/>
                <div className="rounded-padi bg-amber-300 h-28 w-28 shadow-lg absolute top-[3.5rem] -left-2 -z-[1]"/>
                <div className="rounded-padi bg-amber-300 h-28 w-28 shadow-lg absolute top-[6rem] -left-2 -z-[1]"/>
                <div className="rounded-padi bg-amber-300 h-28 w-28 shadow-lg absolute top-[9.5rem] -left-2 -z-[1]"/>

                <div className="text-red-600 absolute -top-24 right-0 -z-[1] text-[9rem] font-bold rotate-3">3</div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
    </div>
}
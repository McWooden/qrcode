import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAccount } from "../../redux/accountSlice"
import { useNavigate } from "react-router-dom"
import { setEncryptObjectLocalStorage } from "../../utils"
import idCard from '../../assets/id-card.png'

export default function Account() {
    const account = useSelector(state => state.account.data)

    return <div className="grid place-items-center p-6 pt-0 flex-1">
        {account ? <CardAccount/> : <FormAccount/>}
    </div>
}

function CardAccount() {
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()

    return <div className="flex flex-col gap-2 w-full max-w-md p-2">
        <div className="my-card shadow">
        <div className="my-tools">
            <div className="my-circle">
                <span className="my-red my-box"></span>
            </div>
            <div className="my-circle">
                <span className="my-yellow my-box"></span>
            </div>
            <div className="my-circle">
                <span className="my-green my-box"></span>
            </div>
        </div>
            <div className="my-card__content flex flex-col w-full max-w-sm p-6">
                <div className="flex">
                    <div className="w-4/12">Nama</div>
                    <p className="w-8-12">{account?.nama}</p>
                </div>
                <div className="flex">
                    <div className="w-4/12">Nomor</div>
                    <p className="w-8-12">+62 {account?.nomor}</p>
                </div>
                <div className="flex">
                    <div className="w-4/12">Kelas / Abs</div>
                    <p className="w-8-12">{account?.kelas} / {account?.nomorAbsen}</p>
                </div>
            </div>
        </div>
        <div className="btn" onClick={() => navigate('/qrcode')}>Tunjukkan QrCode</div>
    </div>
}

function FormAccount() {
    const [nama, setNama] = useState('')
    const [nomor, setNomor] = useState('')
    const [kelas, setKelas] = useState('-')
    const [nomorAbsen, setNomorAbsen] = useState('')
    const [nomorError, setNomorError] = useState(false)

    const dispatch = useDispatch()

    const handleNameChange = (event) => {
        const inputValue = event.target.value
        const regex = /^[a-zA-Z\s]*$/
        
        if (regex.test(inputValue)) {
            setNama(inputValue)
        }
    }

    // function handleNomorChange(value) {
    //     let number = value.replace(/\D/g,'')
    //     console.log('before', number)
    //     switch (number) {
    //         case number.startsWith('+62'):
    //             number = number.replace(/^\+?62-?/, '')
    //             break
    //         case number.startsWith('62'):
    //             number = number.replace(/^62-?/, '')
    //             break
    //         case number.startsWith('0'):
    //             number = number.replace(/^0/, '')
    //             break
    //         default:
    //             console.log('loks like clear')
    //     }
    //     console.log('after', number)

    //     setNomor(number)
    // }

    function handleNomorChange(value) {
        const formattedNumber = value.replace(/\D/g,'').replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')

        formattedNumber.startsWith('8') ? setNomorError(false) : formattedNumber ? setNomorError(true) : setNomorError(false)
        setNomor(formattedNumber)
    }

    function removeNonNumericChars(value) {
        return value.replace(/[\D]/g, '')
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!nomor.startsWith('8')) return

        const account = {nama: nama.trim(), nomor: removeNonNumericChars(nomor), kelas, nomorAbsen: nomorAbsen || 0, timestamp: +new Date()}

        setEncryptObjectLocalStorage('account', account)
        dispatch(setAccount(account))
    }

    const classOption = [{grade: 'X-E', length: 9}, {grade: 'XI-F', length: 8}, {grade: 'XII-MIPA', length: 5}, {grade: 'XII-IPS', length: 3}]

    return <form className="flex flex-col gap-2 max-w-xl w-full h-full text-sm sm:text-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 items-center text-center my-auto">
            <img src={idCard} alt="id card" className="h-20"/>
            <h3 className="font-bold text-lg">Halo!</h3>
            <p className="text-neutral-500 text-sm font-semibold">Silahkan isi identitas kamu untuk membuat kartu QRcode</p>
        </div>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Siapa namamu?</span>
            </div>
            <input type="text" placeholder="Ketik nama" className="input input-bordered w-full" onChange={handleNameChange} value={nama} required/>
        </label>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Nomor handphone Ortu/wali</span>
            </div>
            <div className={`flex items-center input input-bordered gap-1 ${nomorError && 'border-red-600'}`}>
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col min-w-8 w-8 h-8 rounded-full overflow-hidden">
                        <div className="flex-1 bg-[#FF0000]"></div>
                        <div className="flex-1 bg-[#FFFFFF]"></div>
                    </div>
                    <p>+62</p>
                </div>
                <div className="border-l border border-neutral-950/[.25] h-5"/>
                <input type="text" placeholder="Ketik disini" className={`w-full flex-1 bg-transparent ${nomorError && 'text-red-600'}`} onChange={e => handleNomorChange(e.target.value)} value={nomor} required/>
            </div>
            <span className={`text-sm text-red-600 ${nomorError ? 'visible' : 'invisible'}`}>Nomor HP-mu harus dimulai dengan angka 8</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih kelas</span>
                </div>
                <select className="select select-bordered" onChange={(e) => setKelas(e.target.value)} defaultValue='-' required>
                    <option disabled value='-'>Pilih satu</option>
                    {
                        classOption.map((option, index) => {
                        const { grade, length } = option
                        const optionsArray = Array.from({ length }, (_, i) => `${grade}${i + 1}`)
                        return optionsArray.map((classValue, i) => (
                            <option key={index * 100 + i} value={classValue}>
                                {classValue}
                            </option>
                            ))
                        })
                    }
                </select>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nomor absen</span>
                </div>
                <input type="number" placeholder="36" className="input input-bordered w-full" onChange={(e) => setNomorAbsen(e.target.value)} value={nomorAbsen} max={50}/>
            </label>
        </div>
        <button className="btn btn-primary mt-auto" type="submit">Simpan</button>
    </form>
}

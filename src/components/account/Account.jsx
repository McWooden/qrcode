import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAccount } from "../../redux/account"
import { useNavigate } from "react-router-dom"

export default function Account() {
    const account = useSelector(state => state.account.data)

    return <div className="grid place-items-center p-6 pt-0 flex-1">
        {account ? <CardAccount/> : <FormAccount/>}
    </div>
}

function CardAccount() {
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()

    return <div className="flex flex-col gap-2 text-center">
        <p>{account?.nama}</p>
        <p>+62 {account?.nomor}</p>
        <p>{account?.kelas}</p>
        <p>{account?.nomorAbsen}</p>
        <div className="btn" onClick={() => navigate('/qrcode')}>Tunjukkan QrCode</div>
    </div>
}

function FormAccount() {
    const [nama, setNama] = useState('')
    const [nomor, setNomor] = useState('')
    const [kelas, setKelas] = useState('')
    const [nomorAbsen, setNomorAbsen] = useState('')

    const dispatch = useDispatch()

    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        const regex = /^[a-zA-Z]*$/;
        
        if (regex.test(inputValue)) {
            setNama(inputValue);
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(setAccount({nama, nomor: '62' + nomor, kelas, nomorAbsen}))
    }

    const classOption = [{grade: 'X-E', length: 9}, {grade: 'XI-F', length: 8}, {grade: 'XII-MIPA', length: 5}, {grade: 'XII-IPS', length: 3}]

    return <form className="flex flex-col gap-2 max-w-xl w-full h-full" onSubmit={handleSubmit}>
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
            <div className="flex items-center gap-2">
                <span className="bg-base-200 h-full grid place-items-center rounded p-2">+62</span>
                <input type="number" placeholder="81234567890" className="input input-bordered w-full" onChange={(e) => setNomor(e.target.value)} value={nomor} required/>
            </div>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih kelas</span>
                </div>
                <select className="select select-bordered" onChange={(e) => setKelas(e.target.value)} defaultValue='-'>
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
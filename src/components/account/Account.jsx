import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAccount } from "../../redux/account"

export default function Account() {
    const account = useSelector(state => state.account.data)

    return <div className="grid place-items-center p-6 pt-0 flex-1">
        {account ? <CardAccount/> : <FormAccount/>}
    </div>
}

function CardAccount() {
    const account = useSelector(state => state.account.data)
    return <div className="flex flex-col gap-2 text-center">
        <p>{account?.nama}</p>
        <p>{account?.nomor}</p>
        <p>{account?.kelas}</p>
        <p>{account?.nomorAbsen}</p>
    </div>
}

function FormAccount() {
    const [nama, setNama] = useState('')
    const [nomor, setNomor] = useState('')
    const [kelas, setKelas] = useState('')
    const [nomorAbsen, setNomorAbsen] = useState('')

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(setAccount({nama, nomor, kelas, nomorAbsen}))
    }

    const classOption = [{grade: 'X-E', length: 9}, {grade: 'XI-F', length: 8}, {grade: 'XII-MIPA', length: 5}, {grade: 'XII-IPS', length: 3}]

    return <form className="flex flex-col gap-2 max-w-xl w-full h-full" onSubmit={handleSubmit}>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Siapa namamu?</span>
            </div>
            <input type="text" placeholder="Ketik nama" className="input input-bordered w-full" onChange={(e) => setNama(e.target.value)} value={nama} required/>
        </label>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Nomor handphone Ortu/wali</span>
            </div>
            <input type="number" placeholder="6285000000000" className="input input-bordered w-full" onChange={(e) => setNomor(e.target.value)} value={nomor} required/>
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
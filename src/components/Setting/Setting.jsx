import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setBe } from "../../redux/api"

export default function Setting() {
    const be = useSelector(state => state?.server?.be)
    const [serverUri, setServerUri] = useState('')

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(setBe(serverUri))
    }
    return <div className="flex flex-1 flex-col gap-2 items-center h-full p-6 pt-0">
        <p>Current be: {be || ''}</p>
        <form className="flex flex-1 flex-col gap-2 max-w-xl w-full" onSubmit={handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">URI server?</span>
                </div>
                <input type="text" placeholder="Ketik link" className="input input-bordered w-full" onChange={(e) => setServerUri(e.target.value)} value={serverUri} required/>
            </label>
            <button className="btn btn-primary mt-auto" type="submit">Simpan</button>
        </form>
    </div>
    
    
}
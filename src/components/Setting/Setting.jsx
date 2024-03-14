import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBe } from "../../redux/server"

export default function Setting() {
    const be = useSelector(state => state?.server?.be)
    const [serverUri, setServerUri] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        setServerUri(be)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function removeNonAlphaNumeric(str) {
        return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
    }

    function handleSubmit(e) {
        e.preventDefault()

        const filter = removeNonAlphaNumeric(serverUri)
        setServerUri(filter)
        dispatch(setBe(filter))
    }
    return <div className="flex flex-1 flex-col gap-2 items-center h-full p-6 pt-0">
        <form className="flex flex-1 flex-col gap-2 max-w-xl w-full" onSubmit={handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">URI server?</span>
                </div>
                <input type="text" placeholder="Ketik nama" className="input input-bordered w-full" onChange={(e) => setServerUri(e.target.value)} value={serverUri} required/>
            </label>
            <button className="btn btn-primary mt-auto" type="submit">Simpan</button>
        </form>
    </div>
    
    
}
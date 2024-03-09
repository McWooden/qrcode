import { useSelector } from "react-redux"

export default function AlertBe() {
    const be = useSelector(state => state.server.be)
    
    return <div role="alert" className="alert alert-info">
        <span>{be}</span>
    </div>
}
import { useNavigate } from 'react-router-dom'
import scan from '../assets/barcode-scanner.png'
import barcode from '../assets/scan.png'

export default function Home() {
    const navigate = useNavigate()

    return <div className="flex-1 flex justify-center items-center">
        <div className='max-w-xl items-stretch flex flex-col md:flex-row gap-2 items-center justify-center'>
            <div className="card flex-1 bg-base-100 shadow-xl hover:bg-base-200 cursor-pointer w-full" onClick={() => navigate('/pemindai')}>
                <figure className='p-4'><img src={scan} alt="Shoes" className='w-28'/></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Absen
                    </h2>
                    <p>Ingin sesuatu untuk dipindai?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">scanner</div> 
                        <div className="badge badge-outline">untuk memindai</div>
                    </div>
                </div>
            </div>
            <div className="card flex-1 bg-base-100 shadow-xl hover:bg-base-200 cursor-pointer w-full" onClick={() => navigate('/qrcode')}>
                <figure className='p-4'><img src={barcode} alt="Shoes" className='w-28'/></figure>
                <div className="card-body">
                    <h2 className="card-title">
                    QrCode
                    </h2>
                    <p>Tunjukkan qrcode kamu untuk absen!</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">kode</div> 
                        <div className="badge badge-outline">untuk absen</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
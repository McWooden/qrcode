import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { logout } from "../redux/account";

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => navigate('/')}>
                            <span>Halaman Utama</span>
                        </li>
                        <li onClick={() => navigate('/pemindai')}>
                            <span>Pemindai</span>
                        </li>
                        <li onClick={() => navigate('/qrcode')}>
                            <span>QrCode</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <span className="btn btn-ghost text-xl">SMANAGA</span>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
                        <div className="rounded-full">
                            <VscAccount className="text-3xl"/>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => navigate('/akun')}>
                            <span className="justify-between">
                                Profil
                            </span>
                        </li>
                        <li onClick={() => navigate('/setting')}>
                            <span className="justify-between">
                                Setting
                            </span>
                        </li>
                        <li onClick={() => dispatch(logout())}><span>Keluar</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

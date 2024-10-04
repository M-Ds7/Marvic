import { NavLink, useNavigate } from "react-router-dom"

import '../CSS/Navbar.css'
import MARVIC from '../Img/LogoMarvic.png'
import { useContext } from "react"
import { MarvicContext } from "../Context/Context"


const Navbar = () => {
    const { isUser, logout } = useContext(MarvicContext);
    const navigate = useNavigate()

    const handlelogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-persian nabar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={MARVIC} alt="logo de marvic" width="70" height="50" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav justify-content-center">
                            <li className="nav-item ">
                                <NavLink className="nav-link text-black" to="/" > <strong>Home</strong> </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-black" to="/blog"> <strong>Blog</strong> </NavLink>
                            </li>
                            {isUser && (
                                <li className="nav-item">
                                    <NavLink className="nav-link text-black" to="/myaccount"> <strong>Mi cuenta</strong> </NavLink>
                                </li>
                            )}
                        </ul>
                        <ul className="navbar-nav ms-auto nav justify-content-end">
                            {!isUser ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-black" to="/login"> <strong>Iniciar sesion</strong> </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-black" to="/signup"> <strong>Registrate</strong> </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handlelogout}>Salir</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
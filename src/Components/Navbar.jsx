import { NavLink, useNavigate } from "react-router-dom"

import '../CSS/Navbar.css'
import MARVIC from '../Img/LogoMarvic.png'
import { useContext, useState } from "react"
import { MarvicContext } from "../Context/Context"
import axios from "axios"


const Navbar = () => {
    const { isUser, logout, isAdmin, adminId, token } = useContext(MarvicContext);
    const navigate = useNavigate()
    const Api_Base_Url = import.meta.env.VITE_URL_API;
    const [dataAdmin, setDataAdmin] = useState({
        ctx_password: '',
        new_password: '',
        email: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPasswordctx, setShowPasswordctx] = useState({
        showCurrent: false,
        showNew: false
    })
    const [ showPasswordnew, setShowPasswordnew ] = useState({
        showCurrent: false,
        showNew: false
    })

    const toggleShowPasswordnew = (type) => {
        setShowPasswordnew({
            ...showPasswordnew,
            [type]: !showPasswordnew[type]
        })
    }

    const toggleShowPasswordctx = (type) => {
        setShowPasswordctx({
            ...showPasswordctx,
            [type]: !showPasswordctx[type]
        })
    }

    const handleSubmitChangePassword = (e) => {
        e.preventDefault()

        if (!dataAdmin.ctx_password || !dataAdmin.new_password || !dataAdmin.email) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setLoading(true)
        setError('')

        try {
            axios.put(`${Api_Base_Url}/api/v1/auth/change-password/${adminId}?role=ADMINISTRATOR`, {
                ctx_password: dataAdmin.ctx_password,
                new_password: dataAdmin.new_password,
                email: dataAdmin.email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert('Contraseña actualizida de forma correcta')
        } catch (error) {
            setError(error.response?.data?.message || 'Error al actualizar la contraseña')
        } finally {
            setLoading(false)
        }
    }

    const handlelogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-persian navbar-light">
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
                            {isUser && (
                                <>
                                    {!isAdmin ? (
                                        <li className="nav-item">
                                            <NavLink className="nav-link text-black" to="/myaccount"> <strong>Mi cuenta</strong> </NavLink>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-black" to="/admin"> <strong>Usuarios</strong> </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-black" to="/citas"> <strong>Citas</strong> </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <button type="button" className="nav-link text-black" data-bs-toggle="modal" data-bs-target="#exampleModal"> <strong> Cambiar mi contraseña </strong> </button>
                                            </li>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title fs-5" id="expleModalLabel">Cambiar mi contraseña</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {error && <p className="text-danger"> {error} </p>}

                                                            <form onSubmit={handleSubmitChangePassword}>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text d-flex" onClick={() => toggleShowPasswordctx('showCurrent')} style={{ cursor: 'pointer', color: 'blue', margin: '0 0 0 10px', display: 'inline-block' }}>
                                                                        {showPasswordctx.showCurrent ? "Ocultar" : "Mostrar"}
                                                                    </span>
                                                                    <div className="form-floating">
                                                                        <input type={showPasswordctx.showCurrent ? "text" : "password"} className="form-control" id="ctxInput" placeholder="****" value={dataAdmin.ctx_password} onChange={(e) => setDataAdmin({ ...dataAdmin, ctx_password: e.target.value })} />
                                                                        <label htmlFor="ctxInput">Contraseña actual</label>
                                                                    </div>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text d-flex" onClick={() => toggleShowPasswordnew('showCurrent')} style={{ cursor: 'pointer', color: 'blue', margin: '0 0 0 10px', display: 'inline-block' }}>
                                                                        {showPasswordnew.showCurrent ? "Ocultar" : "Mostrar"}
                                                                    </span>
                                                                    <div className="form-floating">
                                                                        <input type={showPasswordnew.showCurrent ? "text" : "password"} className="form-control" id="NewPasswordInput" placeholder="****" value={dataAdmin.new_password} onChange={(e) => setDataAdmin({ ...dataAdmin, new_password: e.target.value })} />
                                                                        <label htmlFor="NewPasswordInput">Nueva contraseña</label>
                                                                    </div>
                                                                </div>

                                                                <div className="form-floating mb-3">
                                                                    <input type="email" className="form-control" id="emailInput" placeholder="****" value={dataAdmin.email} onChange={(e) => setDataAdmin({ ...dataAdmin, email: e.target.value })} />
                                                                    <label htmlFor="emailInput">Email</label>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> close </button>
                                                                    <button type="submit" className="btn btn-primary" disabled={loading}> {loading ? 'Actualizando' : 'Actualizar contraseña'} </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
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
                                    <button className="btn btn-link nav-link btn-danger" onClick={handlelogout}> <strong>Salir</strong> </button>
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
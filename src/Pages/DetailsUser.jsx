import { useContext, useEffect, useState } from "react"
import { MarvicContext } from "../Context/Context"
import axios from "axios";
import { useParams } from "react-router-dom";
import profileUser from ".././Img/PeopleClient.png";


const DetailsUser = () => {
    const { token, adminId } = useContext(MarvicContext)
    const { userId } = useParams()
    const Api_Base_url = import.meta.env.VITE_URL_API;
    const [userData, setUserData] = useState()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)

    const[ changepassword, setChangePassword ] = useState({
        new_password: '',
        email: ''
    })

    useEffect(() => {
        console.log('id user', userId);

        const fetchData = async () => {
            if (!token || !userId || !adminId) {
                setError('Las credenciales no han sido encontradas')
                setLoading(false)
                return;
            }

            console.log('user', userId);

            try {
                //obtener datos generales del usuario
                console.log(`Fetching user data from: ${Api_Base_url}/api/v1/admins/${adminId}/users/${userId}`);
                const responseUser = await axios.get(`${Api_Base_url}/api/v1/admins/${adminId}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserData(responseUser.data)
                setSuccess('Datos cargados correctamente')
                console.log('DatosUser', responseUser.data);
                console.log('responseUser', responseUser.data);


                setTimeout(() => {
                    setSuccess('')
                }, 3000)

            } catch (error) {
                setError(error.response?.data?.message || 'Error al cargar los datos')
                  
                setTimeout(() => {
                    setError('')
                },3000)

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token, userId, adminId, Api_Base_url])

    const handleSubmitPassword = async (e) => {
        e.preventDefault()

        if (!changepassword.new_password || !changepassword.email) {
            setError('Debes completar ambos campos');
            return;
        }

        try {
            const responseChangePassword = await axios.put(`${Api_Base_url}/api/v1/admins/${adminId}/users/${userId}`,{
                new_password : changepassword.new_password,
                email : changepassword.email
            } ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccess('Contraseña actualizada con éxito');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
            console.log(responseChangePassword.data);

        } catch (error) {
            setError(error.response?.data?.message || 'Error al cambiar la contraseña');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        )
    }
    

    if (error) {
        return <p className="text-danger"> {error} </p>
    }
    return (
        <>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-md-12 col-md-4 d-flex flex-column align-items-center p-4 shadow-sm mb-4 mb-md-0">
                        <img src={profileUser} alt={userData.name} className="mb-3 " />
                        {userData && (
                            <>
                                <h5 className="fw-bold">{userData.name} {userData.lastname}</h5>
                                <p>Email:</p>
                                <span className='fw-bold mb-2 d-block'> {userData.auth_data.email} </span>
                                <p>Teléfono:</p>
                                <span className='fw-bold mb-5'>{userData.phone_number}</span>
                            </>
                        )}
                        <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#passwordModal">Cambiar contraseña de usuario</button>
                    </div>

                    <div className="modal fade" id="passwordModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Cambiar contraseña para usuario</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                {error && !success &&<div className="alert alert-danger" role="alert"> {error} </div>}
                                {success && !error && <div className="alert alert-success" role="alert"> {success} </div>}

                                <form onSubmit={handleSubmitPassword}>
                                    <div className="modal-body">
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="floatingPassword" placeholder="********" value={changepassword.new_password} onChange={(e) => setChangePassword({ ...changepassword, new_password: e.target.value})}/>
                                            <label htmlFor="floatingPassword">Nueva contraseña</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="InputEmail" placeholder="no quiere comer" value={changepassword.email} onChange={(e) => setChangePassword({...changepassword, email: e.target.value})}/>
                                            <label htmlFor="InputIssue">Email</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DetailsUser

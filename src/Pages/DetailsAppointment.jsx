import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MarvicContext } from '../Context/Context'
import axios from 'axios'

const DetailsAppointment = () => {
    const { appointmentId } = useParams()
    const { adminId, token } = useContext(MarvicContext)
    const [appointmentData, setAppointmentData] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState();
    const [showModal, setShowModal] = useState(false)
    const [issue, setIssue] = useState('')
    const [images, setImages] = useState([])
    const Api_Base_Url = import.meta.env.VITE_URL_API


    useEffect(() => {
        const fetchData = async () => {
            if (!adminId || !token) {
                setError('Faltan las credenciales. Inténtalo más tarde')
                setLoading(false)
                return
            }

            try {
                const response = await axios.get(`${Api_Base_Url}/api/v1/admins/${adminId}/appointments/${appointmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointmentData(response.data)
                setState(response.data.appointment_data.details.status || "pending");
                console.log('detalles', response.data);
                
            } catch (error) {
                if (error.response) {
                    console.log('Error Response:', error.response);
                } else {
                    console.log('Error:', error.message);
                }

                setError('Error al obtener detalles de la cita');
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [adminId, token, appointmentId, Api_Base_Url])

    const handleSubmitStatus = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`${Api_Base_Url}/api/v1/admins/${adminId}/appointments/${appointmentId}?state=${state}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess('Estatus actualizado exitosamente');
            console.log("Status to be sent:", state);


        } catch (error) {
            console.log('Error Details:', error.response?.data);
            setError('Error al actualizar el estatus');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitMedicalHistory = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('issue', issue);


        images.forEach((image) => {
            formData.append('images', image);
        });


        if (images.length === 0) {
            setError('Debes seleccionar al menos una imagen');
            return;
        }

        try {
            const ResponseMedicalHistory = await axios.post(`${Api_Base_Url}/api/v1/admins/${adminId}/appointments/${appointmentId}/medical-history`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setSuccess('Historial médico actualizado exitosamente')
            setShowModal(false)

            console.log('Issue:', issue);
            console.log('Images:', images);

            console.log('Response date mascotas', ResponseMedicalHistory.data);

            setIssue('')
            setImages([])

        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error', error.response.data);
                setError(error.response.data.details || 'Error al subir el historial médico');
            } else {
                console.log('Error', error.message);
                setError('Error al subir el historial médico');
            }
        }
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };


    useEffect(() => {
        if (success || error) {
            const timeout = setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [success, error]);


    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p className='text-danger'>{error}</p>
    }

    return (
        <>
            <div className="container d-flex flex-column justify-content-center mb-4">
                <h4 className='text-center mt-4 mb-4'>Información sobre la cita de {appointmentData?.user_data?.name}</h4>
                {/* Detalles de la cita */}
                <div className="card h-100 mb-4 mt-4">
                    <h6 className="text-center">Información sobre la cita</h6>
                    <h5 className="card-header">{appointmentData?.appointment_data?.details?.issue}</h5>
                    <div className="card-body">
                        <p className="card-text mt-3">Costo: <strong>{appointmentData?.appointment_data?.details?.price}</strong></p>
                        <p className='card-text'>Estatus: <strong>{appointmentData?.appointment_data?.details?.status}</strong></p>
                    </div>
                </div>

                {/* Información del paciente */}
                <div className="card mb-3">
                    <h6 className='text-center'>Paciente</h6>
                    <div className="row g-0 border">
                        <div className="col-md-4">
                            <img src={appointmentData?.pet_data?.appearance?.image} alt={appointmentData?.pet_data?.basic_info?.name} className='img-fluid' />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body ms-4">
                                <h5 className="card-title text-center"><strong>{appointmentData?.pet_data?.basic_info?.name}</strong></h5>
                                <h6 className="card-text">Raza: <strong>{appointmentData?.pet_data?.basic_info?.breed}</strong></h6>
                                <h6 className="card-text">Edad: <strong>{appointmentData?.pet_data?.basic_info?.age}</strong></h6>
                                <h6 className="card-text">Peso: <strong>{appointmentData?.pet_data?.appearance?.weight}</strong></h6>
                                <h6 className="card-text">Tamaño: <strong>{appointmentData?.pet_data?.appearance?.size}</strong></h6>
                                <h6 className="card-text">Especie: <strong>{appointmentData?.pet_data?.basic_info?.specie}</strong></h6>
                                <h6 className="card-text">Genero: <strong>{appointmentData?.pet_data?.appearance?.gender}</strong></h6>
                                <button onClick={handleOpenModal} className='btn btn-primary mt-3'>Agregar Historial Médico</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal para agregar historial médico */}
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar Historial Médico</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <form onSubmit={handleSubmitMedicalHistory}>
                                    <div className="modal-body">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingIssue"
                                                placeholder="Describe el problema"
                                                value={issue}
                                                onChange={(e) => setIssue(e.target.value)}
                                            />
                                            <label htmlFor="floatingIssue">Observaciones</label>
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="file"
                                                className="form-control"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                                        <button type="submit" className="btn btn-primary" disabled={loading}>Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Información del dueño */}
                <div className="card h-100 mb-4 mt-4">
                    <h6 className="text-center">Información sobre el dueño</h6>
                    <h5 className="card-header">{appointmentData?.user_data?.name} {appointmentData?.user_data?.lastname}</h5>
                    <div className="card-body">
                        <p className="card-title">Email: <strong>{appointmentData?.user_data?.auth_data?.email}</strong></p>
                        <p className="card-text mt-3">Teléfono: <strong>{appointmentData?.user_data?.phone_number}</strong></p>
                    </div>
                </div>
                
                { appointmentData.appointment_data.details.status !== 'completed' ? (
                    <>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={() => setState(state === "pending" ? "completed" : "pending")}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Cambiar de estatus</label>
                    </div>

                    <button onClick={handleSubmitStatus} className='btn btn-primary mt-3'>Actualizar estatus</button>
                    </> 
                ): (
                    <p>El estatus ya esta completada</p>
                )}
                    
                </div>
        </>
    )
}

export default DetailsAppointment

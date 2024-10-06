import { useContext, useEffect, useState } from "react";
import { MarvicContext } from "../Context/Context";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

const AccountPet = () => {
    const { petId } = useParams();
    const Api_Base_utr = import.meta.env.VITE_URL_API;
    const { token, userId } = useContext(MarvicContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataPet, setDataPet] = useState({
        specie: '',
        gender: '',
        name: '',
        size: '',
        age: '',
        breed: '',
        weight: '',
        image: null,
    });
    const [appointmentData, setAppointmentData] = useState({
        timestamp: '',
        issue: ''
    })
    const [appointments, setAppointments] = useState([])
    const [alertMessage, setAllertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        const fetchAppoinments = async () => {
            if (!token || !userId || !petId) {
                setError('No se encontraron las credenciales o la ID de la mascota');
                return;
            }

            try {
                const response = await axios.get(`${Api_Base_utr}/api/v1/users/${userId}/pets/${petId}/appointments/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointments(response.data)
                console.log('Datos de la cita', response.data);

            } catch (error) {
                setError('Error al obtener las citas')
            }
        }
        fetchAppoinments()
    }, [token, userId, petId])

    const deleteAppoinment = async (appointmentId) => {
        try {
            await axios.delete(`${Api_Base_utr}/api/v1/users/${userId}/pets/${petId}/appointments/${appointmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId))
            console.log('Cita eliminada de forma correcta');
        } catch (error) {
            setError('Error al eliminar cita')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingPendingAppointment = appointments.some(
            (appointment) => appointment.details.status !== 'Finalizada'
        )

        if (existingPendingAppointment) {
            setAllertMessage('No se puede agendar una nueva cita hasta que la cita actual este finalizada')
            setAlertType('danger')
            return;
        }


        if (!appointmentData.timestamp || !appointmentData.issue) {
            setError('Todos lo campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post(`${Api_Base_utr}/api/v1/users/${userId}/pets/${petId}/appointments/`, {
                timestamp: appointmentData.timestamp,
                issue: appointmentData.issue
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments([...appointments, response.data.data])
            console.log('Cita agendada de manera exitosa', response.data);

            setAllertMessage('Cita agendada de manera exitosa')
            setAlertType('success')

            setAppointmentData({
                timestamp: '',
                issue: ''
            })

            setTimeout(() => {
                setAllertMessage('')
            }, 3000)

        } catch (error) {
            setError(error.message)
            setAllertMessage('Hubo un error al agendar la cita. por favor intenta de nuevo')
            setAlertType('danger')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !userId || !petId) {
                setError('No se encontraron las credenciales o la ID de la mascota');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${Api_Base_utr}/api/v1/users/${userId}/pets/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Datos de la mascota", response.data);
                setDataPet(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId, petId, token]);

    useEffect(() => {
        const myModal = document.getElementById('myModal');
        const myInput = document.getElementById('myInput');

        if (myModal) {
            myModal.addEventListener('shown.bs.modal', () => {
                myInput && myInput.focus();
            });
        }
        return () => {
            if (myModal) {
                myModal.removeEventListener('shown.bs.modal', () => {
                    myInput && myInput.focus();
                });
            }
        };
    }, []);


    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-12 ">
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-6">
                                {dataPet.appearance && dataPet.appearance.image ? (
                                    <img
                                        src={dataPet.appearance.image}
                                        alt={dataPet.basic_info.name}
                                        className="img-fluid rounded-start"
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <p>No hay imagen disponible</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 className="card-title text-center">{dataPet.basic_info.name}</h4>

                                    <p className="card-text">
                                        <strong>Edad:</strong> {dataPet.basic_info.age}
                                    </p>

                                    <p className="card-text">
                                        <strong>Raza:</strong> {dataPet.basic_info.breed}
                                    </p>

                                    <p className="card-text">
                                        <strong>Especie:</strong> {dataPet.basic_info.specie}
                                    </p>

                                    <p className="card-text">
                                        <strong>Género:</strong> {dataPet.appearance.gender}
                                    </p>

                                    <p className="card-text">
                                        <strong>Tamaño:</strong> {dataPet.appearance.size}
                                    </p>

                                    <p className="card-text">
                                        <strong>Peso:</strong> {dataPet.appearance.weight} kg
                                    </p>
                                    <div className="d-flex justify-content-center gap-2 my-3">
                                        <NavLink className="text-white btn btn-success" to={`/changeDataPet/${petId}`} >Modficar datos</NavLink>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Agendar cita
                                        </button>
                                    </div>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Agendar cita</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                {alertMessage && (
                                                    <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                                                        {alertMessage}
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                    </div>
                                                )}
                                                <form action="" onSubmit={handleSubmit}>
                                                    <div className="modal-body">
                                                        <div className="form-floating mb-3">
                                                            <input type="datetime-local" className="form-control" id="floatingCitation" placeholder="2024-09-24T15:54" value={appointmentData.timestamp} onChange={(e) => setAppointmentData({ ...appointmentData, timestamp: e.target.value })} />
                                                            <label htmlFor="floatingCitation">Hora y fecha de cita</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="InputIssue" placeholder="no quiere comer" value={appointmentData.issue} onChange={(e) => setAppointmentData({ ...appointmentData, issue: e.target.value })} />
                                                            <label htmlFor="InputIssue">Sintomas que presenta la mascota</label>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                        <button type="submit" className="btn btn-primary">Agendar cita</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-5">
                    <h4 className="text-center mt-4">Historial de citas</h4>
                    <p className="text-center text-danger">Una vez creada la cita no se podra crear otra, asta que la cita actual este finalizada</p>
                    {appointments && appointments.length > 0 ? (
                        <ul className="list-group">
                            {appointments.map((appointment, index) => (
                                <li key={index} className="list-group-item">
                                    <p>
                                        <strong>Fecha de creación:</strong>{" "}
                                        {new Date(appointment.dates.creation_date).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Fecha de expiración:</strong>{" "}
                                        {new Date(appointment.dates.expiration_date).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Síntomas:</strong> {appointment.details.issue}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {appointment.details.status}
                                    </p>
                                    <p>
                                        <strong>Precio:</strong> ${appointment.details.price}
                                    </p>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-danger col-md-3" onClick={() => deleteAppoinment(appointment.id)}>
                                            Eliminar cita
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay citas programadas para esta mascota</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPet;

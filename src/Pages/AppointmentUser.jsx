import { useContext, useEffect, useState } from "react"
import { MarvicContext } from "../Context/Context"
import axios from "axios"
import { NavLink } from "react-router-dom"

const AppointmentUser = () => {
    const { adminId, token } = useContext(MarvicContext)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const Api_Base_Url = import.meta.env.VITE_URL_API;

    useEffect(() => {
        const fechData = async () => {
            setLoading(true)
            setError('')

            if (!adminId || !token) {
                setError('No tienes acceso')
                setLoading(false)
                return;
            }

            try {
                const ResponseAppointment = await axios.get(`${Api_Base_Url}/api/v1/admins/${adminId}/appointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointments(ResponseAppointment.data)


            } catch (error) {
                if (error.response && error.response.data && error.response.data.codes) {
                    setError(error.response.data.details);
                } else {
                    setError('Credenciales incorrectas. Intentalo de nuevo')
                }
            } finally {
                setLoading(false)
            }

        }
        fechData()
    }, [adminId, Api_Base_Url,token])

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p className="text-danger"> {error} </p>
    }

    const getTodayDay = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    const filteredAppointments = appointments.filter((item) => {
        const appointmentDate = new Date(item.dates.creation_date).toISOString().split('T')[0];
        const today = getTodayDay();

        return(
            appointmentDate === today && item.details.issue.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })

    return (
        <>
            <p className="text-center mt-4 mb-4">Citas agendadas</p>
            <div className="d-flex justify-content-center mb-3">
                <input
                    type="text"
                    placeholder="Buscar por problematica de la cita..."
                    className="form-control form-control-lg w-75 w-md-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="row">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card h-100">
                                <h5 className="card-header"> {new Date(appointment.dates.creation_date).toLocaleDateString()} </h5>
                                <div className="card-body">
                                    <div className="card-title"> {appointment.details.issue} </div>
                                    <NavLink className="btn btn-primary w-45" to={`/citas/${appointment.id}`}>Saber más...</NavLink>
                                </div>
                            </div>
                        </div>
                    ))
                ): (
                    <p className="text-center"> No se encontraron citas que coincidan con la búsqueda, o No hay citas para el día de hoy </p>
                )}
            </div>
        </>
    )
}

export default AppointmentUser

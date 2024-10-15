import { useContext, useEffect, useState } from "react";
import { MarvicContext } from "../Context/Context";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {

  const { adminId, token } = useContext(MarvicContext)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState()
  const [dataUser, setDataUser] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const Api_Base_Url = import.meta.env.VITE_URL_API;

  useEffect(() => {

    const fetchData = async () => {
      if (!token || !adminId) {
        setError('No se encontraron las credenciales')
        setLoading(false)
        return
      }

      console.log('Admin ID', adminId);
      console.log('token', token);
      try {
        //obtener datos del administrador 
        const response = await axios.get(`${Api_Base_Url}/api/v1/admins/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('Admin', response.data);
        setSuccess('Los datos se han cargado de forma correcta')
        setAdminData(response.data)

        setTimeout(() => {
          setSuccess('')
        }, 3000)

        //obtener datos de los usuarios
        const responsUser = await axios.get(`${Api_Base_Url}/api/v1/admins/${adminId}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setDataUser(responsUser.data)
        console.log('DataUser', responsUser.data);



      } catch (error) {
        setError(error.response?.data?.message || 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token, adminId, Api_Base_Url])

  const filterUser = dataUser.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p className="test-danger"> {error} </p>
  }

  return (
    <div>
      {success && <div className="alert alert-success" role="alert"> {success} </div>}
      <h1 className="text-center m-4">Bienvenido, {adminData.name} {adminData.lastname} </h1>

      <div className="seacrch d-flex justify-content-center mb-3">
        <input type="text" placeholder="buscar..." className="form-control form-control-lg w-75 w-md-50" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="row">
        {filterUser.length > 0 ? (
          filterUser.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <h6 className="card-header"> {item.auth_data.role} </h6>
                <div className="card-body">
                  <h5 className="card-title"> {item.name} {item.lastname} </h5>
                  <NavLink className="btn btn-primary w-50" to={`/detailUser/${item.id}`}>Saber más...</NavLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>No se encontraron Personas o mascota con este nombre</li>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useContext, useEffect, useState } from 'react';
import '../CSS/MyAccount.css';
import profileImage from '../Img/PeopleClient.png';
import maxImage from '../Img/Pet.jpg';
import bolilloImage from '../Img/Pet.jpg';
import bombomImage from '../Img/Pet.jpg';
import axios from 'axios';
import { MarvicContext } from '../Context/Context';


const MyAccount = () => {
  const{ token, userId } = useContext(MarvicContext); 
  const [ userData, setUserData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() =>{
    
    const fetchData = async() =>{
      if (!token || !userId) {
        setError("No se encontraron las credenciales");
        setLoading(false);
        return;
      }


      try {
        const response = await axios.get(`http://82.180.132.46:8000/api/v1/users/${userId}`,{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }) 
        console.log("Datos del usuario", response.data);
        setUserData(response.data)
      } catch (error) {
        setError(error.message) 
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [token, userId])

  if (loading) {
    return(
      <p>Cargando...</p>
    )
  }

  if (error) {
    return(
      <p>Error: {error}</p>
    )
  }

  return (
    <>
      <div className="container-fluid p-4 bg-light">
        <div className="row">

          <div className="col-md-4 d-flex flex-column align-items-center bg-white p-4 shadow-sm">
            <img src={profileImage} alt="Foto de perfil" className="rounded-circle mb-3" width="100" height="100" />
            {userData &&(
              <>
              <h5 className="fw-bold">{userData.name} {userData.lastname}</h5>
              <p>Email:</p>
              <span className='fw-bold mb-2'> {userData.auth_data.email} </span>
              <p>Teléfono:</p>
              <span className='fw-bold'>{userData.phone_number}</span>
              </> 
            )}
          </div>

          {/* Panel de Mascotas y Registro */}
          <div className="col-md-8 p-4">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <a className="nav-link active" data-bs-toggle="tab" href="#misMascotas">Mis mascotas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" data-bs-toggle="tab" href="#registrarMascota">Registrar mascota</a>
              </li>
            </ul>

            <div className="tab-content">
              {/* Sección de Mis Mascotas */}
              <div className="tab-pane fade show active" id="misMascotas">
                <div className="list-group">
                  <div className="list-group-item d-flex align-items-center mb-2 bg-info-subtle">
                    <img src={maxImage} alt="Max" className="rounded-circle" width="50" height="50" />
                    <div className="ms-3">
                      <h6 className="mb-0">Max</h6>
                      <small>Chihuahua</small>
                    </div>
                  </div>
                  <div className="list-group-item d-flex align-items-center mb-2 bg-info-subtle">
                    <img src={bolilloImage} alt="Bolillo" className="rounded-circle" width="50" height="50" />
                    <div className="ms-3">
                      <h6 className="mb-0">Bolillo</h6>
                      <small>Mestizo</small>
                    </div>
                  </div>
                  <div className="list-group-item d-flex align-items-center mb-2 bg-info-subtle">
                    <img src={bombomImage} alt="Bombom" className="rounded-circle" width="50" height="50" />
                    <div className="ms-3">
                      <h6 className="mb-0">Bombom</h6>
                      <small>Perico</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de Registrar Mascota */}
              <div className="tab-pane fade" id="registrarMascota">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombreMascota" className="form-label">Nombre de la mascota</label>
                    <input type="text" className="form-control" id="nombreMascota" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="razaMascota" className="form-label">Raza de la mascota</label>
                    <input type="text" className="form-control" id="razaMascota" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipoMascota" className="form-label">Tipo de mascota</label>
                    <select className="form-select" id="tipoMascota">
                      <option>Perro</option>
                      <option>Gato</option>
                      <option>Ave</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edadMascota" className="form-label">Edad de la mascota</label>
                    <input type="number" className="form-control" id="edadMascota" />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Registrar Mascota</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;

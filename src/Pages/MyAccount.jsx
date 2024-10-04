import { useContext, useEffect, useState } from 'react';
import '../CSS/MyAccount.css';
import profileImage from '../Img/PeopleClient.png';
import axios from 'axios';
import { MarvicContext } from '../Context/Context';
import { NavLink, useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { token, userId } = useContext(MarvicContext);
  const Api_Base_Url = import.meta.env.VITE_URL_API;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [activeTab, setActiveTap] = useState('misMascotas')
  const [data, setData] = useState({
    name: '',
    specie: '',
    gender: '',
    size: '',
    age: '',
    breed: '',
    weight: '',
    image: null
  })
  const [petsData, setPEtsData] = useState([])
  const navigate = useNavigate()

  const { name, specie, gender, size, age, breed, weight, image } = data;

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userId) {
        setError("No se encontraron las credenciales");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${Api_Base_Url}/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUserData(response.data)

        const petResponse = await axios.get(`${Api_Base_Url}/api/v1/users/${userId}/pets/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setPEtsData(petResponse.data)
        
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [token, userId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !specie || !gender || !size || !age || !breed || !weight || !image) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (image && !['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
      alert('Por favor, sube una imagen válida (jpg, png, gif).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name)
      formData.append('specie', specie)
      formData.append('gender', gender)
      formData.append('size', size)
      formData.append('age', age)
      formData.append('breed', breed)
      formData.append('weight', weight)
      formData.append('image', image)

      const response = await axios.post(`${Api_Base_Url}/api/v1/users/${userId}/pets/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      setSuccessMessage('Mascota resgistrada')
      setTimeout(() =>{
        setSuccessMessage('')
      }, 3000)
      setPEtsData((prevPets) => [...prevPets, response.data.data]);
      console.log('Datos de mascota de post', response.data);
      
      setData({
        name: '',
        specie: '',
        gender: '',
        size: '',
        age: '',
        breed: '',
        weight: '',
        image: null
      })
    } catch (error) {
      console.error("Error al registrar a la mascota", error);
      setSuccessMessage('Error al registrar mascota')
      setTimeout(() => {
        setSuccessMessage('')
      },3000)
    }
  }

  const handleDeletePet = async (petId, e) => {
    e.stopPropagation();
    console.log('Id de la mascota a eliminar', petId);

    try {
      const response = await axios.delete(`${Api_Base_Url}/api/v1/users/${userId}/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Mascota eliminada de forma correcta', response.data);
      setPEtsData(petsData.filter(pet => pet.id !== petId))
      setSuccessMessage("Mascota eliminada de forma correcta")
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('La mascota no fue encontrada.');
      } else {
        console.log('Error al eliminar la mascota', error.message);
        alert('Error al eliminar la mascota.');
      }
    }
  }

  if (loading) {
    return (
      <p>Cargando...</p>
    )
  }

  if (error) {
    return (
      <p>Error: {error}</p>
    )
  }

  const handlePetClick = (petId) => {
    navigate(`/acount/pets/${petId}`)
  }

  return (
    <>
      <div className="container-fluid p-4 bg-light">
        <div className="row">
          <div className="col-12 col-md-4 d-flex flex-column align-items-center bg-white p-4 shadow-sm mb-4 mb-md-0">
            <img src={profileImage} alt="Foto de perfil" className="rounded-circle mb-3" width="100" height="100" />
            {userData && (
              <>
                <h5 className="fw-bold">{userData.name} {userData.lastname}</h5>
                <p>Email:</p>
                <span className='fw-bold mb-2 d-block'> {userData.auth_data.email} </span>
                <p>Teléfono:</p>
                <span className='fw-bold'>{userData.phone_number}</span>
                <NavLink className="text-secondary" to={`/changepassword/${userId}`}>Cambiar contraseña</NavLink>
              </>
            )}
          </div>

          {/* Panel de Mascotas y Registro */}
          <div className="cl-12 col-md-8 p-4">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'misMascotas' ? 'active' : ''}`} onClick={() => setActiveTap('misMascotas')}> Mis mascotas </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link text-dark ${activeTab === 'registrarMascota' ? 'active' : ''}`} onClick={() => setActiveTap('registrarMascota')} href='#registrarMascota'> Registrar mascota </a>
              </li>
            </ul>

            <div className="tab-content">
              {successMessage && <div className="alert alert-success" role='alert'> {successMessage} </div>}
              
              {activeTab === 'misMascotas' && (
                <div className="tab-pane fade show active" id="misMascotas">
                  <div className="list-group">
                    {petsData.length > 0 ? (
                      petsData.map((pet) => (
                        <div key={pet.id} className="list-group-item d-flex align-items-center mb-2 bg-info-subtle" onClick={() => handlePetClick(pet.id)} style={{ cursor: 'pointer' }}>
                          <img src={pet.appearance?.image || profileImage} alt={pet.basic_info?.name || 'Mascota'} className="rounded-circle" width="50" height="50" />
                          <div className="ms-3">
                            <h6 className="mb-0">{pet.basic_info ? pet.basic_info.name : 'Nombre no disponible'}</h6>
                            <small>{pet.basic_info ? pet.basic_info.breed : 'Raza no disponible'}</small>
                          </div>
                          <button className='btn btn-danger ms-auto' onClick={(e) => handleDeletePet(pet.id, e)}>Eliminar</button>
                        </div>
                      ))
                    ) : (
                      <div>No tienes mascotas registradas.</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'registrarMascota' && (
                <div className="tab-pane fade show active" id="registrarMascota">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input type="text" className='form-control' id='nameInput' placeholder='Danger' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                      <label htmlFor="nameInput">Nombre de la mascota</label>
                    </div>

                    <div className="form-floating mb-3">
                      <select className='form-select' id="specieInput" aria-label='Floating label select' value={data.specie} onChange={(e) => setData({ ...data, specie: e.target.value })}>
                        <option value="option1">Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                      </select>
                      <label htmlFor="specieInput">Especie</label>
                    </div>

                    <div className="form-floating mb-3">
                      <select className='form-select' id="genderSelect" aria-label='Floating label select' value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}>
                        <option value="option1">Genero de la mascota</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                      </select>
                      <label htmlFor="genderSelect">Genero de la mascota</label>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="text" className='form-control' id='ageInput' placeholder='5' value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} />
                          <label htmlFor="ageInput">Edad</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <select className='form-select' id="sizeInput" aria-label='FLoating label select' value={data.size} onChange={(e) => setData({ ...data, size: e.target.value })}>
                            <option value="">Tamaño</option>
                            <option value="Grande">Grande</option>
                            <option value="Mediano">Mediano</option>
                            <option value="Chico">Chico</option>
                          </select>
                          <label htmlFor="sizeInput">Tamaño</label>
                        </div>
                      </div>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="text" className='form-control' id='breedInput' placeholder='chihuhua' value={data.breed} onChange={(e) => setData({ ...data, breed: e.target.value })} />
                          <label htmlFor="breedInput">Raza</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="number" className='form-control' id='weightInput' placeholder='5' value={data.weight} onChange={(e) => setData({ ...data, weight: e.target.value })} />
                          <label htmlFor="weightInput">Peso</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <input type="file" className='form-control' id='imageInput' placeholder='foto' onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                      <label htmlFor="imageInput">Foto de la mascota</label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className='btn btn-primary'>Añadir</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default MyAccount;
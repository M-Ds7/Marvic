import axios from "axios"
import { useState } from "react"
import imgMarvic from '../Img/ImgSingUp.jpg'

const SignUp = () => {

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const Api_Base_Url = import.meta.env.VITE_URL_API;
  const [showPassword, setShowPassword] = useState({
    showCurrent: false,
    showNew: false
  })

  const toggleShowPassword = (type) => {
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    setSuccessMessage("")

    axios.post(`${Api_Base_Url}/api/v1/users/singup`, {
      name: name,
      lastname: lastname,
      phone_number: phone_number,
      email: email,
      password: password
    })

      .then(response => {
        setSuccessMessage("Usuario registrado con éxito")
      })
      .catch(error => {
        setLoading(false)
        if (error.response && error.response.data && error.response.data.codes) {
          const errorDetails = error.response.data.details;
          setError(errorDetails)
        } else {
        }
      })
  }

  return (
    <>
      <div className="container my-4">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <h4 className="fw-bold text-center">Marvic</h4>
            <h2 className="text-center"> !Cuidemos a tus mascotas¡</h2>
            <h5 className="text-center">Registrate</h5>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger" role="alert"> {error} </div>}
              {successMessage && (
                <div className="alert alert-success" role="alert"> {successMessage} </div>
              )}
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nameusers" placeholder="David" aria-label="nombre del usuario"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="nameusers" >Nombre</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="userslastnames" placeholder="Lazaro Rodriguez" aria-label="apellidos del usuario"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="userslastnames" >Apellidos</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="phoneusers" placeholder="9612706005" aria-label="numero de telefono del usuario"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
                <label htmlFor="phoneusers" >Telefono</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="emailusers" placeholder="example@gmail.com" aria-label="email del usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailusers" >Email</label>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text d-flex" onClick={() => toggleShowPassword('showCurrent')} style={{ cursor: 'pointer', color: 'blue', margin: '0 0 0 10px', display: 'inline-block' }}>
                  {showPassword.showCurrent ? "Ocultar" : "Mostrar"}
                </span>
                <div className="form-floating">
                  <input type={showPassword.showCurrent ? "text" : "password"} className="form-control" id="passwordusers" placeholder="1234567890" aria-label="contraseña del usuario"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="passwordusers" >Contraseña</label>
                </div>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block" aria-label="registrarme en marvic">Registrarme</button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
            <img src={imgMarvic} alt="Imagen de servicios de marvic" width="650" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp

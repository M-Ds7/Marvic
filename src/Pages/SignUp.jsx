import axios from "axios"
import { useState } from "react"


const SignUp = () => {

  const [ name, setName ] = useState('')
  const [ lastname, setLastName ] = useState('')
  const [ phone_number, setPhone_number ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post('http://82.180.132.46:8000/api/v1/users/singup', {
        name: name,
        lastname: lastname,
        phone_number: phone_number,
        email: email,
        password: password
      }
      )
        .then(response => {
          console.log(response.data);
          
        })
        .catch(error => {
          console.log('Error', error);
          
        })
    }

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <h4 className="fw-bold text-center">Marvic</h4>
            <h2 className="text-center"> !Cuidemos a tus mascotas¡</h2>
            <h5 className="text-center">Registrate</h5>
            <form action="" onSubmit={handleSubmit}>
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
                onChange={(e) =>setPhone_number(e.target.value) }
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
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="passwordusers" placeholder="1234567890" aria-label="contraseña del usuario" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordusers" >Contraseña</label>
              </div>
              <button className="btn btn-primary col-md-12" aria-label="registrarme en marvic">Registrarme</button>
            </form>
          </div>
          <div className="col-md-6">
            <img src="" alt="Imagen de servicios de marvic" />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp

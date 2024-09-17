import axios from "axios"
import { useContext, useState } from "react"
import { MarvicContext } from "../Context/Context"
import { useNavigate } from "react-router-dom";


const LogIn = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState("");
  const { login, setToken } = useContext(MarvicContext);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://82.180.132.46:8000/api/v1/auth/login',{
      email : email,
      password : password
    })
    .then(response => {
      const token = response.data.token;
      const userId = response.data.user_id;
      setToken(token);
      login(userId);
      navigate('/myaccount')
      console.log(response.data);
    })
    .catch(error => {
      setError("Credenciales incorrectas. Inténtalo de nuevo")
      console.log('Error', error);
    })
  }

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <img src="" alt="imagen de servicios de marvic" />
          </div>
          <div className="col-md-6">
            <h2 className="text-center">Marvic</h2>
            <h4 className="text-center ">Bienvenido</h4>
            <form action="" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email" name="emailuser" id="emailinput" className="form-control" placeholder="exmaple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailinput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" name="passworduser" id="passwordinput" className="form-control" placeholder="1234567890"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordinput">Contraseña</label>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button className="btn btn-primary col-md-12">Iniciar sesion</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogIn

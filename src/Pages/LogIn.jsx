import axios from "axios"
import { useContext, useState } from "react"
import { MarvicContext } from "../Context/Context"
import { useNavigate } from "react-router-dom";
import imgMarvic from '../Img/ImgLogIn.jpg'



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [ loading, setLoading ] = useState(false)
  const { login, setToken } = useContext(MarvicContext);
  const navigate = useNavigate()
  
  const Api_Base_Url = import.meta.env.VITE_URL_API;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)

    axios.post(`${Api_Base_Url}/api/v1/auth/login`, {
      email,
      password
    })
      .then(response => {
        const token = response.data.token;
        const userId = response.data.user_id;
        const role = response.data.role;
        const adminId = role === 'ADMINISTRATOR' ? response.data.user_id : null;

        console.log('token', token);
        console.log('UserId', userId);
        console.log('role', role);
        console.log('adminId', adminId);
        

        setToken(token);
        login(token, userId, role, adminId);

        if (role === 'ADMINISTRATOR') {
          navigate('/admin')
        } else {
          navigate('/myaccount')
        }
        
        console.log(response.data);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.codes) {
          setError(error.response.data.details);
        } else {
          setError('Credenciales incorrectas. Intentalo de nuevo')
        }
        console.log('Error', error);
      })
      .finally(() =>{
        setLoading(false)
      })
  }

  return (
    <>
      <div className="container my-4">
        <div className="row align-itmes-center">
          <div className="col-lg-6 d-none d-lg-flex justify-contet-center align-itmes-center">
            <img src={imgMarvic} alt="imagen de servicios de marvic" className=" img-fluid rounded"/>
          </div>
          <div className="col-lg-6 col-md-12">
            <h2 className="text-center">Marvic</h2>
            <h4 className="text-center mb-4">Bienvenido</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4">
                <input type="email" id="emailinput" className="form-control" placeholder="exmaple@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailinput">Email</label>
              </div>
              <div className="form-floating mb-4">
                <input type="password" id="passwordinput" className="form-control" placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordinput">Contraseña</label>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block "> {loading ? 'Iniciando sesión...' : 'Iniciar sesión'} </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogIn
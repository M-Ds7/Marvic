import axios from "axios";
import { useState, useContext } from "react";
import { MarvicContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import imgMarvic from '../Img/ImgMarvic.png';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [ctxPassword, setCtxPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const Api_Base_Url = import.meta.env.VITE_URL_API;
  const { token, userId } = useContext(MarvicContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${Api_Base_Url}/api/v1/auth/change-password/${userId}?role=USER`, {
      ctx_password: ctxPassword,
      new_password: newPassword,
      email: email
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setMessage("Contraseña cambiada con éxito");
        navigate('/myaccount');

        
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.details) {
          setError(error.response.data.details);
        } else {
          setError('Error al cambiar la contraseña. Inténtalo de nuevo');
        }
      });
  };

  return (
    <div className="container my-4">
      <div className="row align-itmes-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src={imgMarvic} alt="imagen de servicios de marvic" className="img-fluid"/>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Cambiar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailinput"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="emailinput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="ctxPasswordinput"
                placeholder="Contraseña actual"
                value={ctxPassword}
                onChange={(e) => setCtxPassword(e.target.value)}
              />
              <label htmlFor="ctxPasswordinput">Contraseña actual</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="newPasswordinput"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="newPasswordinput">Nueva contraseña</label>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}
            <button className="btn btn-primary w-100">Cambiar Contraseña</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

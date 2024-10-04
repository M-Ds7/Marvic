import '../CSS/Footer.css';
import LogoNavbar from '../Img/LogoMarvic.png';
import MarvicFacebook from '../Img/iconFacebook.png';
import MarvicInstagram from '../Img/iconinstagram.png';
import MarvicTwitter from '../Img/iconTwitter-50.png';
import AddressMarvic from '../Img/marvic-address.png';
import CallMarvic from '../Img/marvic-call.png';
import EmailMarvic from '../Img/marvic-email.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-footer py-4">
        <div className='d-flex align-items-center justify-content-center mb-3'>
          <img src={LogoNavbar} alt="Logo de la empresa" width='100' height='80' className='m-4'/>
        </div>
        <div className="d-flex flex-row justify-content-center mb-3">
          <a href="https://www.facebook.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer' className='me-3'> 
            <img src={MarvicFacebook} alt="Cuenta de Facebook de Marvic" width='30' height='30'/> 
          </a>
          <a href="https://www.instagram.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer' className='me-3'> 
            <img src={MarvicInstagram} alt="Cuenta de Instagram de Marvic" width='30' height='30'/> 
          </a>
          <a href="https://twitter.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer'> 
            <img src={MarvicTwitter} alt="Cuenta de Twitter de Marvic" width='30' height='30'/> 
          </a>
        </div>

        <div className="container-flex d-flex flex-column flex-md-row justify-content-center align-items-center m-2 text-center">
          <div className="d-flex align-items-center justify-content-center m-4">
            <img src={AddressMarvic} alt="Icono de locación de Marvic" width="30" height="30" className='m-2'/>
            <p> 
              Santos Degollado, Revolución &, Francisco Villa,<br />
              30740 Tapachula de Córdova y Ordóñez, Chis.
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center m-2 text-center">
            <img src={CallMarvic} alt="Icono de número telefónico de Marvic" width="30" height="30" className='m-2'/>
            <p>962 243 0394</p>
          </div>
          <div className="d-flex align-items-center justify-content-center m-2 text-center">
            <img src={EmailMarvic} alt="Email de Marvic" width="30" height="30" className='m-2'/>
            <p>clinicaveterinariamarvic90@gmail.com</p>
          </div>
        </div>
        <div className="bg-dark">
          <h6 className='text-center text-light p-3'>Todos los derechos reservados</h6>
        </div>
      </footer>
    </>
  );
}

export default Footer;

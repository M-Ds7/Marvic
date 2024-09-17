import '../CSS/Footer.css';
import LogoNavbar from '../Img/LogoMarvic.png';
import MarvicFacebook from '../Img/iconFacebook.png';
import MarvicInstagram from '../Img/iconinstagram.png';
import MarvicTwitter from '../Img/iconTwitter-50.png';
import AddressMarvic from '../Img/iconmarcador.png';
import CallMarvic from '../Img/iconllamada.png';
import EmailMarvic from '../Img/iconemail.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-footer">
        <div className='d-flex align-items-center justify-content-center'>
          <img src={LogoNavbar} alt="Logo de la empresa" width='70' height='70' className='m-4'/>
        </div>
        <div className="d-flex flex-row mb-3 align-items-center justify-content-center">
          <a href="https://www.facebook.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer' className='me-2'> 
            <img src={MarvicFacebook} alt="Cuenta de Facebook de Marvic" width='30' height='30'/> 
          </a>
          <a href="https://www.instagram.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer'> 
            <img src={MarvicInstagram} alt="Cuenta de Instagram de Marvic" width='30' height='30'/> 
          </a>
          <a href="https://twitter.com/Veterinariamarvic/" target='_blank' rel='noopener noreferrer' className='ms-2'> 
            <img src={MarvicTwitter} alt="Cuenta de Twitter de Marvic" width='30' height='30'/> 
          </a>
        </div>
        <div className="container-flex d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center m-4">
            <img src={AddressMarvic} alt="Icono de locación de Marvic" width="30" height="30" className='m-2'/>
            <p> 
              Santos Degollado, Revolución &, Francisco Villa,<br />
              30740 Tapachula de Córdova y Ordóñez, Chis.
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center m-4">
            <img src={CallMarvic} alt="Icono de número telefónico de Marvic" width="30" height="30" className='m-2'/>
            <p>962 243 0394</p>
          </div>
          <div className="d-flex align-items-center justify-content-center m-4">
            <img src={EmailMarvic} alt="Email de Marvic" width="30" height="30" className='m-2'/>
            <p>clinicaveterinariamarvic90@gmail.com</p>
          </div>
        </div>
        <div className="bg-dark">
          <h6 className='text-center text-light p-4'>Todos los derechos reservados</h6>
        </div>
      </footer>
    </>
  );
}

export default Footer;

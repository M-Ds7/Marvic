import Layout from "../Components/Layout"
import '../CSS/Home.css'

import ImageHome from "../Img/ImageHome 1.png";
import Conocenos from '../Img/Conocenos.jpg'
import Calendario from '../Img/CalendarioVacunacion.jpg'
import Cirujia from '../Img/Cirujiaa.jpg'
import Croqueteria from '../Img/Croqueteria.jpg'
import DentaduraCanina from '../Img/Dentalcanino.jpg'
import EsteticaCanina from '../Img/EsteticaCanina.jpg'
import FarmaciaCanina from '../Img/FarmaciaCanina.jpg'
import HozpitalizacionCanina from '../Img/HospitalizacionCanina.jpg'
import HotelCanino from '../Img/HotelCanino.jpg'
import Laboratorio from '../Img/laboratorio.jpg'
import PetShop from '../Img/Petshop.jpg'
import Ultrasonido from '../Img/Ultrasonido.jpg'

const Home = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid bg-container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center text-center text-lg-start">
              <h1 className="fw-bold">Marvic</h1>
              <h3>
                <span className="d-block text-center">¡Al servicio</span>
                <span className="d-block text-center">de</span>
                <span className="d-block">Super mascotas!</span>
              </h3>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <img src={ImageHome} alt="Imagens de mascotas" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="container my-4 d-flex flex-column align-items-center justify-content-center text-center text-lg-start">
          <h3 className="text-center mb-3">Nuestros servicios</h3>
          <div id="carouselExampleSlidesOnly" className="carousel slide custom-carousel" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
              <div className="carousel-item  active">
                <img src={Calendario} alt="Imagen de calendario de vacunación" className="d-block w-100 mx-auto" />
                <div className="carousel-caption">
                  <h3 className="text-black">Calendario de vacunación</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Cirujia} alt="imagen de cirujia" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption ">
                  <h3 className="text-white">Cirujias</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Croqueteria} alt="imagen de croqueteria" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-white">Croqueteria</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={DentaduraCanina} alt="imaggen de cuidado de dentadura" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Profilaxis</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={EsteticaCanina} alt="imagen de estetica" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Estetica</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={FarmaciaCanina} alt="Imagen de farmacia" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Farmacia</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={HozpitalizacionCanina} alt="Imagen de hopitalizacion" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Hospitalización</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={HotelCanino} alt="imagen de hote para mascotas" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Hotel</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Laboratorio} alt="iamgen de laboratorio" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-black">Laboratorio</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={PetShop} alt="Imagen de pet shop" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-white">Pet Shop</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Ultrasonido} alt="Imagen de ultrasonido" className="d-block w-100 mx-auto img-fluid" />
                <div className="carousel-caption">
                  <h3 className="text-white">Ultrasonidos</h3>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="carouselExampleSlidesOnly" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-container">
          <div className="container col-xl-10 col-xxl-8 px-4 py-5 ">
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">¿Quiénes somos?</h1>
                <p className="col-lg-10 fs-4">Clínica Veterinaria Marvic es un lugar dedicado completamente
                  al servicio de tu mascota. Estamos comprometidos exclusivamente
                  a la salud y bienestar de nuestros compañeros de vida de 4 patas.
                  La responsabilidad, honestidad, calidad y amor por los animales
                  son la base de nuestro trabajo.</p>
              </div>
              <div className="col-md-10 mx-auto col-lg-5">
                <img src={Conocenos} alt="Conócenos" className="rounded-3 img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home;

import Layout from "../Components/Layout"
import '../CSS/Home.css'

import ImageHome from "../Img/ImageHome 1.png";
import ImageStetica from "../Img/imageStetica.png"
import Conocenos from '../Img/Conocenos.jpg'

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
            <div className="col-lg-6 d-flex align-items-center justigy-content-center">
              <img src={ImageHome} alt="Imagens de mascotas" className="img-fluid"/>
            </div>
          </div>
        </div>
        <div className="container my-4">
          <h2 className="text-center display-5 fw-bold mb-5">Nuestros servicios</h2>
          <div className="row g-4">
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de estética canina" width="100" className="img-fluid"/>
                <h6 className="mt-2">Estética canina</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de pet shop" width="100" className="img-fluid"/>
                <h6 className="mt-2">Pet shop</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de laboratorio" width="100" className="img-fluid"/>
                <h6 className="mt-2">Laboratorio</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de ultrasonido" width="100" className="img-fluid" />
                <h6 className="mt-2">Ultrasonido</h6>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen dental" className="img-fluid" width="100"/>
                <h6 className="mt-2">Dental</h6>
              </div>
            </div>
            <div className=" col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de cirugía" width="100" className="img-fluid"/>
                <h6 className="mt-2">Cirugías</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de hospitalización" width="100" className="img-fluid"/>
                <h6 className="mt-2">Hospitalización</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de calendario" width="100" className="img-fluid"/>
                <h6 className="mt-2">Calendario de vacunación</h6>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-sm-6 col-md-4 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de croquetas" width="100" className="img-fluid"/>
                <h6 className="mt-2">Croquetería</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de hotel canino" width="100" className="img-fluid"/>
                <h6 className="mt-2">Hotel Canino</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de farmacia canina" width="100" className="img-fluid"/>
                <h6 className="mt-2">Farmacia canina</h6>
              </div>
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

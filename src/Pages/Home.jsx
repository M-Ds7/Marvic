import Layout from "../Components/Layout"
import '../CSS/Home.css'

import ImageHome from "../Img/ImageHome 1.png";
import ImageStetica from "../Img/imageStetica.png"
import CarMarvic from '../Img/CarMarvic.png'

const Home = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid bg-container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
              <h1 className="fw-bold">Marvic</h1>
              <h3 className="text-md-start">
                <span className="d-block text-center">¡Al servicio</span>
                <span className="d-block text-center">de</span>
                <span className="d-block">Super mascotas!</span>
              </h3>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <img src={ImageHome} alt="Imagens de mascotas" height="450" width="auto" />
            </div>
          </div>
        </div>
        <div className="container my-4">
          <h2 className="text-center display-5 fw-bold mb-5">Nuestros servicios</h2>
          <div className="row g-4">
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de estética canina" width="100" height="auto" />
                <h6 className="mt-2">Estética canina</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de pet shop" width="100" height="auto" />
                <h6 className="mt-2">Pet shop</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de laboratorio" width="100" height="auto" />
                <h6 className="mt-2">Laboratorio</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de ultrasonido" width="100" height="auto" />
                <h6 className="mt-2">Ultrasonido</h6>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de dental" width="100" height="auto" />
                <h6 className="mt-2">Dental</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de Cirujia" width="100" height="auto" />
                <h6 className="mt-2">Cirujias</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de hozpitalizacion" width="100" height="auto" />
                <h6 className="mt-2">Hozpitalización</h6>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de calendario" width="100" height="auto" />
                <h6 className="mt-2">Calendario de vacunacion</h6>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4 d-felx justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de croqueta" width="100" height="auto" />
                <h6 className="mt-2">Croqueteria</h6>
              </div>
            </div>
            <div className="col-md-4 d-felx justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de hotel canino" width="100" height="auto" />
                <h6 className="mt-2">Hotel Canino</h6>
              </div>
            </div>
            <div className="col-md-4 d-felx justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <img src={ImageStetica} alt="Imagen de farmacia canina" width="100" height="auto" />
                <h6 className="mt-2">Farmacia canina</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-container">
          <div className="row">
            <h3 className="text-center my-4 fw-bold">¿Quienes somos?</h3>
            <div className="col-md-6 d-flex justify-content-center">
              <img src={CarMarvic} alt="imagen del carro de marvic" width="400" height="auto" className="m-4" />
            </div>
            <div className="col-md-6">
              <h5>
                Clínica Veterinaria Marvic es un lugar dedicado completamente <br /> al servicio de tu mascota,
                estamos comprometidos exclusivamente <br /> a la salud y bienestar de nuestros compañeros  de vida de 4 patas. <br />
                La responsabilidad, honestidad, calidad y amor por los animales <br /> son la base de nuestro trabajo.
              </h5>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home

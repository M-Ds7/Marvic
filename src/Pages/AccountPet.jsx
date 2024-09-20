import { useContext, useEffect, useState } from "react";
import { MarvicContext } from "../Context/Context";
import axios from "axios";
import { useParams } from "react-router-dom";

const AccountPet = () => {
    const { petId } = useParams();
    const { token, userId } = useContext(MarvicContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataPet, setDataPet] = useState({
        specie: '',
        gender: '',
        name: '',
        size: '',
        age: '',
        breed: '',
        weight: '',
        image: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !userId || !petId) {
                setError('No se encontraron las credenciales o la ID de la mascota');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://82.180.132.46:8000/api/v1/users/${userId}/pets/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Datos de la mascota", response.data);
                setDataPet(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId, petId, token]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-12 ">
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-6">
                                {dataPet.appearance && dataPet.appearance.image ? (
                                    <img
                                        src={dataPet.appearance.image}
                                        alt={dataPet.basic_info.name}
                                        className="img-fluid rounded-start"
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <p>No hay imagen disponible</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 className="card-title text-center">{dataPet.basic_info.name}</h4>

                                    <p className="card-text">
                                        <strong>Edad:</strong> {dataPet.basic_info.age}
                                    </p>

                                    <p className="card-text">
                                        <strong>Raza:</strong> {dataPet.basic_info.breed}
                                    </p>

                                    <p className="card-text">
                                        <strong>Especie:</strong> {dataPet.basic_info.specie}
                                    </p>

                                    <p className="card-text">
                                        <strong>Género:</strong> {dataPet.appearance.gender}
                                    </p>

                                    <p className="card-text">
                                        <strong>Tamaño:</strong> {dataPet.appearance.size}
                                    </p>

                                    <p className="card-text">
                                        <strong>Peso:</strong> {dataPet.appearance.weight} kg
                                    </p>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="btn-group"  role="group" aria-label="Basic mixed styles">
                                            <button type="button" className="btn btn-success">Agendar cita</button>
                                            <button type="button" className="btn btn-warning">Modificar datos</button>
                                            <button type="button" className="btn btn-danger">Eliminar datos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPet;

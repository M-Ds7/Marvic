import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MarvicContext } from "../Context/Context";

const EditPetForm = () => {
    const { petId } = useParams();
    const { token, userId } = useContext(MarvicContext);
    const Api_Base_Url = import.meta.env.VITE_URL_API;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [dataPet, setDataPet] = useState({
        name: '',
        age: '',
        breed: '',
        specie: '',
        gender: '',
        size: '',
        weight: '',
        image: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !userId || !petId) {
                setError('No se encontraron las credenciales o la ID de la mascota');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${Api_Base_Url}/api/v1/users/${userId}/pets/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const petData = response.data;
                setDataPet({
                    name: petData.basic_info.name,
                    age: petData.basic_info.age,
                    breed: petData.basic_info.breed,
                    specie: petData.basic_info.specie,
                    gender: petData.appearance.gender,
                    size: petData.appearance.size,
                    weight: petData.appearance.weight,
                    image: petData.appearance.image,
                });

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId, petId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataPet((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', dataPet.name);
        formData.append('age', dataPet.age);
        formData.append('breed', dataPet.breed);
        formData.append('specie', dataPet.specie);
        formData.append('gender', dataPet.gender);
        formData.append('size', dataPet.size);
        formData.append('weight', dataPet.weight);

        if (dataPet.image instanceof File) {
            formData.append('image', dataPet.image);
        }

        try {
            await axios.put(`${Api_Base_Url}/api/v1/users/${userId}/pets/${petId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            navigate(`/acount/pets/${petId}`);
        } catch (error) {
            setError(error.message);
            console.error("Error al enviar los datos:", error.response.data);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container-fluid my-4">
            <h2 className="text-center">Modificar datos de {dataPet.name}</h2>
            {success && <div className="alert alert-success">Datos actualizados correctamente.</div>}
            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-12 col-md-12" >
                    {!dataPet.image ? (
                        <div className="form-floating mb-3">
                            <input
                                type="file"
                                className="form-control"
                                id="imageInput"
                                placeholder="foto"
                                onChange={(e) => setDataPet({ ...dataPet, image: e.target.files[0] })}
                            />
                            <label htmlFor="imageInput">Foto de la mascota</label>
                        </div>
                    ) : (
                        <p className="text-muted">Ya existe una imagen: <a href={dataPet.image} target="_blank" rel="noopener noreferrer">Ver imagen actual</a></p>
                    )}
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={dataPet.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <label htmlFor="name">Nombre</label>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            value={dataPet.age}
                            onChange={handleChange}
                            placeholder="Edad"
                            required
                        />
                        <label htmlFor="age">Edad</label>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="breed"
                            name="breed"
                            value={dataPet.breed}
                            onChange={handleChange}
                            placeholder="Raza"
                            required
                        />
                        <label htmlFor="breed">Raza</label>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="specie"
                            name="specie"
                            value={dataPet.specie}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una especie</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <label htmlFor="specie">Especie</label>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="gender"
                            name="gender"
                            value={dataPet.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona género</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                        <label htmlFor="gender">Género</label>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="size"
                            name="size"
                            value={dataPet.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un tamaño</option>
                            <option value="Grande">Grande</option>
                            <option value="Mediano">Mediano</option>
                            <option value="Chico">Chico</option>
                        </select>
                        <label htmlFor="size">Tamaño</label>
                    </div>
                </div>
                <div className="col-12 col-md-12">
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="weight"
                            name="weight"
                            value={dataPet.weight}
                            onChange={handleChange}
                            placeholder="Peso"
                            required
                        />
                        <label htmlFor="weight">Peso (kg)</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
                </div>
            </form>
        </div>
    );
};

export default EditPetForm;

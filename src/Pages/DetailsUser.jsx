import { useContext, useEffect, useState } from "react"
import { MarvicContext } from "../Context/Context"
import axios from "axios";


const DetailsUser = () => {
    const {token, userId, adminId} = useContext(MarvicContext)
    const Api_Base_url = import.meta.env.VITE_URL_API;
    const [ userData, setUserData ] = useState()
    const [ error, setError ] = useState('')
    const [ succes, setSuccess ] = useState('')
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        console.log('id user', userId);
        
        const fetchData = async () => {
            if (!token || !userId || !adminId) {
                setError('Las credenciales no han sido encontradas')
                setLoading(false)
                return;
            }

            console.log('user', userId);
            
            try {
                //obtener datos generales del usuario
                console.log(`Fetching user data from: ${Api_Base_url}/api/v1/admins/${adminId}/users/${userId}`);
                const responseUser = await axios.get(`${Api_Base_url}/api/v1/admins/${adminId}/users/${userId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserData(responseUser.data)
                setSuccess('Datos cargados correctamente')
                console.log('DatosUser', responseUser.data);
                console.log('responseUser', responseUser.data);
                

                setTimeout(() =>{
                    setSuccess('')
                },3000)

            } catch (error) {
                setError(error.response?.data?.message || 'Error al cargar los datos')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [ token, userId, adminId ,Api_Base_url ])

    if (loading) {
        return <p>Cargando datos...</p>
    }

    if (error) {
        return <p className="text-danger"> {error} </p>
    }
  return (
    <>
    <h1>hola soy el usuario</h1>
    </>
  )
}

export default DetailsUser

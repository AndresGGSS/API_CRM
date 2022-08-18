import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const SeeClient = () => {

    const [clients, setClients] = useState({})
    const [charging, setCharging] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getClientAPI = async () => {
            try {
                const url = `http://localhost:4000/clients/${id}`
                const answer = await fetch(url)
                const result = await answer.json()
                setClients(result)
            } catch (error) {
                
            }
            setTimeout(() => {
              setCharging(!charging)
            }, 1000);
        }
        getClientAPI()
    }, [])
    

  return (
    charging ? <Spinner/> : Object.keys(clients).length === 0 ? <p className="text-red-600 text-center uppercase text-4xl font-bold bg-white p-3 rounded-md block "> No hay resultados</p> : (
     <div>
        <h1 className='font-black text-4xl text-violet-700'>Ver Cliente: <span className="text-rose-700">{clients.name}</span></h1>
        <p className='mt-3'>Infomación del Cliente</p>
        {clients.name && (<p className="text-4xl text-gray-600 mt-10"><span className="uppercase text-gray-800 font-bold">Cliente: </span>{clients.name}</p>)}
        {clients.email && (<p className="text-2xl text-gray-600 mt-4"><span className="uppercase text-gray-800 font-bold">Email: </span>{clients.email}</p>)}
        {clients.phone && (<p className="text-2xl text-gray-600 mt-4"><span className="uppercase text-gray-800 font-bold">Teléfono: </span>{clients.phone}</p>)}
        {clients.business && (<p className="text-2xl text-gray-600 mt-4"><span className="uppercase text-gray-800 font-bold">Empresa: </span>{clients.business}</p>)}
        {clients.notes && (<p className="text-2xl text-gray-600 mt-4"><span className="uppercase text-gray-800 font-bold">Notas: </span>{clients.notes}</p>)}
    </div>
    )

  )
}

export default SeeClient
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import  Formm  from "../components/Formm"

const EditClient = () => {

  const [client, setClients] = useState({})
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
          setCharging(!charging)
      }
      getClientAPI()
  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-purple-700'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
      {client?.name ? (
        <Formm
          client={client}
          charging={charging}
        />
      ): 'ID de Cliente no válido'}
    </>
  )
}

export default EditClient
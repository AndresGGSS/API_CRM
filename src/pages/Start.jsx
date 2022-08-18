import { useState, useEffect } from "react"
import Client from "../components/Client"

const Start = () => {

  const [ clients, setClients] = useState([])

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = 'http://localhost:4000/clients'
        const answer = await fetch(url)
        const result = await answer.json()
        setClients(result)
      } catch (error) {
        
      }
    }
    getClientsAPI()
  }, [])

  const handleDelete = (id) => {
    const confirn = confirm("Deseas eliminar este cliente?")
    if (confirn) {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const answer = await fetch(url,{
          method: 'DELETE'
        })
        await answer.json()
        const arrayClients = clients.filter( value => value.id !== id)
        setClients(arrayClients)
      } catch (error) {
        
      }
      
    }

  }
  

  return (

    <>
     <h1 className='font-black text-4xl text-purple-700'>Clientes</h1>
     <p className='mt-3'>Administra tus clientes</p>
     <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className=" bg-purple-700 text-white">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Empresa</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <Client
          key={client.id}
          client={client}
          handleDelete={handleDelete}
          />
        ))}
      </tbody>
     </table>
    </>

  )
}

export default Start
import { useNavigate } from "react-router-dom"

const Client = ({client, handleDelete}) => {

    const navigate = useNavigate()

    const {name, business, email, phone, notes, id} = client

  return (
    <tr className='border-b hover:bg-gray-50 rounded-md'>
        <td className="text-center">{name}</td>
        <td className="text-center">
            <p><span className='text-gray-800 uppercase font-bold'>Email:</span>{email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Tel:</span>{phone}</p>
        </td>
        <td className="text-center">{business}</td>
        <td className="text-center">
            <button className='bg-pink-700 hover:bg-pink-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 rounded-md' type='button'
            onClick={() => navigate(`/clients/${id}`)}>Ver</button>
            <button className='bg-violet-600 hover:bg-violet-500 block w-full text-white p-2 uppercase font-bold text-xs mt-2 rounded-md' type='button'
            onClick={() => navigate(`/clients/edit/${id}`)}>Editar</button>
            <button className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2 rounded-md' type='button'
            onClick={() => handleDelete(id)}>Eliminar</button>
        </td>
    </tr>
  )
}

export default Client
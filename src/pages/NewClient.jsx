import React from 'react'
import Formm from '../components/Formm'

const NewClient = () => {

  return (
    <>
        <h1 className='font-black text-4xl text-purple-700'>Nuevo Cliente</h1>
        <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>
        <Formm/>
    </>
  )
}

export default NewClient
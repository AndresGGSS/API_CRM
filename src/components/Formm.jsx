import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import Error from "./Error"
import Spinner from "./Spinner"

const Formm = ({client, charging}) => {

  const navigate = useNavigate()

  const newClienteschema = Yup.object().shape({
    name: Yup.string().min(3, 'El nombre es muy corto').max(20,'El nombre es muy largo').required("El nombre del cliente es obligatorio"),
    business: Yup.string().required('El nombre de la empresa es obligatorio'),
    email: Yup.string().email('Email no válido').required('El email es obligatorio'),
    phone: Yup.number().positive('Número no válido').integer('Número no válido').typeError('Número no válido'),
    notes: '',
  })

  const handleSubmit = async (value) => {
    try {
      let answer
      if(client.id) {
          const url = `http://localhost:4000/clients/${client.id}`
          answer = await fetch(url, {
              method: 'PUT',
              body: JSON.stringify(value),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      } else {
        const url = `http://localhost:4000/clients`
        answer = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
      await answer.json()
      navigate('/clients')
  } catch (error) {
      console.log(error)
  }
  }
  return (
    charging ? <Spinner/> :(
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md 
      md:w-3/4 mx-auto">
          <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{client?.name ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
          <Formik initialValues={{
            name: client?.name ?? "",
            business: client?.business ?? "",
            email: client?.email ?? "",
            phone: client?.phone ?? "",
            notes: client?.name ?? "",
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm}) => {
              await handleSubmit(values)
              resetForm()
          }}
          validationSchema={newClienteschema}
          >
  
          {({errors, touched}) => {
            return(
              <Form className='mt-10'>
  
                <div className='mb-4'>
                  <label className='text-gray-800' htmlFor="name">Nombre:</label>
                  <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Nombre del cliente"
                  name="name"
                  />
                  {errors.name && touched.name ? (<Error>{errors.name}</Error>) : null}
                </div>
  
                <div className='mb-4'>
                  <label className='text-gray-800' htmlFor="business">Empresa:</label>
                  <Field
                  id="business"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Empresa del cliente"
                  name="business"
                  />
                  {errors.business && touched.business ? (<Error>{errors.business}</Error>) : null}
                </div>
  
                <div className='mb-4'>
                  <label className='text-gray-800' htmlFor="email">Email:</label>
                  <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Email del cliente"
                  name="email"
                  />
                  {errors.email && touched.email ? (<Error>{errors.email}</Error>) : null}
                </div>
  
                <div className='mb-4'>
                  <label className='text-gray-800' htmlFor="phone">Teléfono:</label>
                  <Field
                  id="phone"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Teléfono del cliente"
                  name="phone"
                  />
                  {errors.phone && touched.phone ? (<Error>{errors.phone}</Error>) : null}
                </div>
  
                <div className='mb-4'>
                  <label className='text-gray-800' htmlFor="notes">Notas:</label>
                  <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder= "Notas del cliente"
                  name='notes'
                  />
                </div>
  
                <input 
                type="submit"
                value={client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-violet-800 p-3 text-white uppercase font-bold text-lg rounded-md"
                />
  
              </Form>
              )}}
          </Formik>
      </div>
    )
  )
}
Formm.defaultProps = {
  client: {},
  charging: false
}

export default Formm
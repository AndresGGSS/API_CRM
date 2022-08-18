import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Start from "./pages/Start"
import NewClient from "./pages/NewClient"
import EditClient from "./pages/EditClient"
import SeeClient from "./pages/SeeClient"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clients" element={<Layout/>}>
          <Route index element={<Start/>}/>
          <Route path="new" element={<NewClient/>}/>
          <Route path="edit/:id" element={<EditClient/>}/>
          <Route path=":id" element={<SeeClient/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

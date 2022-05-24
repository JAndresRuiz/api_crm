import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from "./Layout/Layout";
import { Inicio } from "./Components/Inicio";
import { NuevoCliente } from "./Components/NuevoCliente";
import { EditarCliente } from './Components/EditarCliente';
import { VerCliente } from "./Components/VerCliente.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/clientes" element={<Layout />} >
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Cliente } from './Cliente';
import "../Styles/NuevoCliente.css";

const Inicio = () => {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = 'http://localhost:4000/clientes';
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesApi();
  }, [])

  const handleEliminar = async id => {
    const confirmar = window.confirm("¿Desea eliminar este cliente?");
    if(confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {method: 'DELETE'});
        await respuesta.json();
        const arrayClientes = clientes.filter(cliente => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <p className='newClientParagraph' >Administra tus clientes</p>
      <table className="tableContainer" >
        <thead className='tableHead'>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map( cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export { Inicio };
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formulario } from "../Components/Formulario";

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
        setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  return (
    <>
      <h1>Editar cliente</h1>
      <p>Utiliza este formulario para cambiar los datos de un cliente</p>
      {cliente?.nombre ? (<Formulario cliente={cliente} cargando={cargando} />) : <p>Cliente no valido</p>}
    </>
  )
}

export { EditarCliente };
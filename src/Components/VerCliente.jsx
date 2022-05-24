import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../Components/Spinner";
import "../Styles/verCLiente.css";

const VerCliente = () => {
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

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p className="noResult">No hay resultados</p>
  ) : (
    <div className="infoClientContainer">
      <h2 className="textNameContainer">
        Información sobre el clinete:{" "}
        <span className="clientName">{cliente.nombre}</span>
      </h2>
      <p className="paragraph">
        <span className="ver">Cliente: </span>
        {cliente.nombre}
      </p>
      <p className="paragraph">
        <span className="ver">Empresa: </span>
        {cliente.empresa}
      </p>
      <p className="paragraph">
        <span className="ver">Email: </span>
        {cliente.email}
      </p>
      {cliente.telefono && (
        <p className="paragraph">
          <span className="ver">Teléfono: </span>
          {cliente.telefono}
        </p>
      )}
      {cliente.notas && (
        <p className="paragraph">
          <span className="ver">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export { VerCliente };

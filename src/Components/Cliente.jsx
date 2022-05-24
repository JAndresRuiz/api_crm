import { useNavigate } from "react-router-dom";
import "../Styles/Cliente.css";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();

  const { nombre, email, telefono, id } = cliente;

  return (
    <>
      <tr className="bodyContent">
        <td className="bodyNameContent">{nombre}</td>

        <td className="bodyEmailContent">
          <p>
            <span className="bodySpan">Email: </span>
            {email}
          </p>
          <p>
            <span className="bodySpan">Tel: </span>
            {telefono}
          </p>
        </td>

        <td className="bodyButtonContent">
          <button
            type="button"
            className="buttonContent watch"
            onClick={() => navigate(`/clientes/${id}`)}
          >
            Ver
          </button>

          <button
            type="button"
            className="buttonContent edit"
            onClick={() => navigate(`/clientes/editar/${id}`)}
          >
            Editar
          </button>

          <button type="button" className="buttonContent delete" onClick={() => handleEliminar(id) }>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};

export { Cliente };
  
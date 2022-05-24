import { Formulario } from './Formulario';
import "../Styles/NuevoCliente.css";

const NuevoCliente = () => {
  return (
    <>
      <p className='newClientParagraph' >Llena los siguientes campos para registrar un cliente</p>
      <Formulario />
    </>
  )
}

export { NuevoCliente };